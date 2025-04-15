const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');

// 账号注册
exports.userRegist = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    password = bcryptjs.hashSync(password, 10)
    try {
        const data = await UserModel.findOne({ username })
        if (data) return res.err('账号已存在')
        await UserModel.create({ username, password })
        res.json({ code: 200, message: '账号注册成功' });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 账号登录
exports.userLogin = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    try {
        let data = await UserModel.findOneAndUpdate(
            { username },
            { status: 'online' },
            { new: true, projection: { username: 1, password: 1, role: 1 } })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('密码错误')
        // if (data.status === 'online') return res.err('账号已登录')
        // 返回token
        const user = {
            ...data,
            password: '',
            avatar: '',
        }
        // 返回data
        const userData = data.toObject();
        data = {
            username: userData.username,
            role: userData.role
        }
        const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey,); // { expiresIn: '3h' }
        res.json({
            code: 200,
            message: '账号登录成功',
            data,
            token: 'Bearer ' + tokenStr
        });
    } catch (error) {
        console.log(error);
        res.err('服务器内部错误')
    }
}
// 退出登录
exports.userLogout = async (req, res) => {
    const { username } = req.params;
    if (!username) return res.err('账号不存在')
    try {
        const data = await UserModel.findOneAndUpdate({ username }, { status: 'outline' })
        if (data === null) return res.err('账号不存在')
        if (data.status === 'outline') return res.err('账号已退出')
        res.json({ code: 200, message: '账号退出成功' });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 主页
exports.userHome = async (req, res) => {
    const { username } = req.params;
    if (!username) return res.err('账号不存在')
    try {
        const data = await UserModel
            .findOne({ username })
            .select({ username: 1, avatar: 1, signature: 1 })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '获取成功', data });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
