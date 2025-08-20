const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const UserInfoModel = require('../models/system/user-model');
const AuthCodeModel = require('../models/auth/authcode');
const loginLogController = require('../controllers/log/login');


/**
 * 登录
 * @returns data token
 */
exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    try {
        const data = await UserInfoModel.findOneAndUpdate(
            { username },
            { status: '在线' },
            { new: true, runValidators: true, projection: { username: 1, password: 1, role: 1 } })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('密码错误')
        if (data.status === 'online') return res.err('账号已登录')
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
            return res.err('登录日志记录失败');
        }
    } catch (error) {
        res.err('服务器内部错误')
    }
}

// 注册
exports.register = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    password = bcryptjs.hashSync(password, 10)
    try {
        const data = await UserInfoModel.findOne({ username })
        if (data) return res.err('账号已存在')
        const newUser = await UserInfoModel.create({ username, password })
        if (!newUser) return res.err('账号注册失败')
        res.json({ code: 200, message: '账号注册成功' });
    } catch (error) {
        res.json({ code: 500, message: '服务器内部错误' });
    }
}
// 退出登录
exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    try {
        const data = await UserInfoModel.findOneAndUpdate({ username }, { status: '离线' }, { runValidators: true })
        if (data === null) return res.err('账号不存在')
        // if (data.status === 'outline') return res.err('账号已退出')
        res.json({ code: 200, message: '账号退出成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}

// 获取验证码
exports.sendCode = async (req, res) => {
    const { phone } = req.body
    if (!phone) return res.err('手机号不能为空')
    try {
        // 生成6位随机验证码
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // 存储验证码，设置3分钟过期时间
        AuthCodeModel.create({ phone, code, expireAt: new Date(Date.now() + 3 * 60 * 1000) });

        // 调用短信服务发送验证码(转为直接发送给前端)
        // await sendSMS(phone, code);
        res.json({ code: 200, message: '验证码发送成功', data: code });
    } catch (error) {
        res.err('验证码发送失败')
    }
}

// 验证码登录
exports.codeLogin = async (req, res) => {
    const { phone, code } = req.body
    if (!phone || !code) return res.err('手机号或验证码不能为空')
    try {
        // 从Redis获取验证码
        // const savedCode = await redis.get(`code:${phone}`);

        // 验证验证码是否正确
        // if (!savedCode || savedCode !== code) {
        //     return res.err('验证码错误或已过期');
        // }

        // 查找或创建用户
        let user = await UserInfoModel.findOne({ phone });
        if (!user) {
            user = await UserInfoModel.create({
                username: phone,
                phone,
                password: bcryptjs.hashSync(Math.random().toString(36).slice(-8), 10) // 随机密码
            });
        }
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
        res.err('验证码登录失败')
    }
}