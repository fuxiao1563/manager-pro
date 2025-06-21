const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');
const UserInfoModel = require('../models/UserInfoModel');


/**
 * 角色管理??????????????
 * @returns data
 */
exports.userInfoList = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { skip, limit } = req.body
    skip = typeof skip === 'number' ? skip : 0
    limit = typeof limit === 'number' ? limit : 5
    try {
        const userInfoList = await UserInfoModel
            .find()
            .select({ username: 1, role: 1, phone: 1, email: 1, status: 1 })
            .skip(skip).limit(limit)
        const total = await UserInfoModel.find().countDocuments()
        const data = {
            userInfoList,
            total
        }
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.err('服务器内部错误')
    }
}

// 添加用户
exports.addUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { username, phone, email, avatar, gender, status } = req.body
    if (!username) return res.err('账号不能为空')
    try {
        const result = await UserInfoModel.findOne({ username })
        if (result) return res.err('账号已存在')
        const password = bcryptjs.hashSync('admin', 10)
        await UserInfoModel.create({ username, password, phone, email, avatar, gender, status })
        res.json({ code: 200, message: '用户添加成功, 默认密码为admin' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}