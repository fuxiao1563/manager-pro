const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const UserInfoModel = require('../models/system/user-model');


/**
 * 登录
 * @returns data token
 */
exports.login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    try {
        let data = await UserInfoModel.findOneAndUpdate(
            { username },
            { status: '在线' },
            { new: true, runValidators: true, projection: { username: 1, password: 1, role: 1 } })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('密码错误')
        // if (data.status === 'online') return res.err('账号已登录')    
        // 返回data
        data = {
            username: data.username,
            role: data.role
        }
        // 返回token
        const user = {
            ...data,
            password: '',
        }
        const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey);
        res.json({
            code: 200,
            message: '账号登录成功',
            data,
            token: 'Bearer ' + tokenStr
        });
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
        console.log(error)
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
