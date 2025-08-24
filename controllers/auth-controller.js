const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const crypto = require('crypto');
const UserInfoModel = require('../models/system/user-model');
const AuthCodeModel = require('../models/auth/authcode');
const loginLogController = require('../controllers/log/login');


/**
 * 登录
 * @returns data token
 */
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return res.json({ code: 400, message: '账号或密码不能为空' })
        const data = await UserInfoModel.findOneAndUpdate(
            { username },
            { status: '在线' },
            { new: true, runValidators: true, projection: { username: 1, password: 1, role: 1 } })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.json({ code: 400, message: '密码错误' })
        if (data.status === 'online') return res.json({ code: 400, message: '账号已登录' })
        // 返回data
        const newData = {
            username: data.username,
            role: data.role
        }
        const tokenStr = jwt.sign(newData, jwtConfig.jwtSecretKey);
        res.json({
            code: 200,
            message: '账号登录成功',
            data: newData,
            token: 'Bearer ' + tokenStr
        });

        // 记录登录日志
        try {
            const logReq = { userId: data._id }
            const logRes = {
                err: (message) => {
                    console.error('登录日志记录错误:', message);
                },
                json: (responseData) => {
                    if (responseData.code !== 200) {
                        console.error('登录日志记录失败:', responseData.message);
                    }
                }
            }
            loginLogController.recordLog(logReq, logRes)
        } catch (error) {
            return res.json({ code: 500, message: '登录日志记录失败' });
        }
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}

// 注册
exports.register = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) return res.json({ code: 400, message: '账号或密码不能为空' })
    password = bcryptjs.hashSync(password, 10)
    try {
        const data = await UserInfoModel.findOne({ username })
        if (data) return res.json({ code: 400, message: '账号已存在' })
        const newUser = await UserInfoModel.create({ username, password })
        if (!newUser) return res.json({ code: 500, message: '账号注册失败' })
        res.json({ code: 200, message: '账号注册成功' });
    } catch (error) {
        res.json({ code: 500, message: '服务器内部错误' });
    }
}
// 退出登录
exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.json({ code: 401, message: 'token不存在' })
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.json({ code: 401, message: '无效的认证信息' })
    try {
        const data = await UserInfoModel.findOneAndUpdate({ username }, { status: '离线' }, { runValidators: true })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        // if (data.status === 'outline') return res.err('账号已退出')
        res.json({ code: 200, message: '账号退出成功' })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}

// 获取验证码
exports.sendCode = async (req, res) => {
    try {
        const { phone } = req.body
        if (!phone) return res.json({ code: 400, message: '手机号不能为空' })
        // 查询验证码是否已发送
        const sended = await AuthCodeModel.findOne({ phone })
        const min = 100000
        const max = 999999
        const authCode = crypto.randomInt(min, max + 1).toString();
        if (!sended) {
            // 存储验证码，设置3分钟过期时间
            await AuthCodeModel.create({ phone, authCode, expireAt: new Date(Date.now() + 3 * 60 * 1000) })
        } else {
            // 重新生成验证码
            await AuthCodeModel.updateOne({ phone }, { authCode, expireAt: new Date(Date.now() + 3 * 60 * 1000) })
        }
        res.json({ code: 200, message: sended ? '验证码已重新发送' : '验证码发送成功', data: authCode });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}

// 验证码登录 / 注册
exports.codeLogin = async (req, res) => {
    try {
        const { phone, authCode } = req.body
        if (!phone || !authCode) return res.json({ code: 400, message: '手机号或验证码不能为空' })

        // 验证验证码是否正确
        const code = await AuthCodeModel.findOne({ phone });
        if (!code) return res.json({ code: 400, message: '手机号不存在或验证码已过期' });
        console.log('code:', code)
        if (code.authCode !== authCode) return res.json({ code: 400, message: '验证码错误' });

        // 登录或注册账户
        let user = await UserInfoModel.findOne({ phone });
        if (!user) {
            // 注册新用户，生成随机密码
            const randomPassword = crypto.randomBytes(16).toString('hex');
            user = await UserInfoModel.create({
                username: phone,
                phone,
                password: bcryptjs.hashSync(randomPassword, 10), // 随机密码
            });
        }
        // 用户在线状态
        const onlineStatus = await UserInfoModel.findById(user._id);
        if (onlineStatus.status === '在线') return res.json({ code: 400, message: '账号已登录' })
        await UserInfoModel.findByIdAndUpdate(user._id, { status: '在线' });
        // 生成JWT Token
        const data = {
            username: user.username,
            role: user.role
        };
        const tokenStr = jwt.sign(data, jwtConfig.jwtSecretKey);

        res.json({
            code: 200,
            message: '登录成功',
            data,
            token: 'Bearer ' + tokenStr
        });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}