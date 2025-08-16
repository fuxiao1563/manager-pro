const { Types } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../jwtConfig/index');
const UserInfoModel = require('../../models/UserInfoModel');



/**
 * 用户管理
 * @returns data
 */
// 用户管理 + 搜索用户
exports.searchUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    const { username, gender, role, department, phone, email, status } = req.body
    let { skip = 0, limit = 5} = req.body
    skip = typeof skip === 'number' ? skip : 0
    limit = typeof limit === 'number' ? limit : 5
    const query = {}
    if (username) query.username = username
    if (gender) query.gender = gender
    if (role) query.role = role
    if (department) query.department = department
    if (phone) query.phone = phone
    if (email) query.email = email
    if (status) query.status = status
    try {
        const users = await UserInfoModel.find(query).skip(skip).limit(limit)
        const totalCount = await UserInfoModel.countDocuments(query)
        const data = {
            users,
            totalCount
        }
        res.json({ code: 200, message: '查询成功', data });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 添加用户
exports.addUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { username, gender, role,  department, status, phone, email } = req.body
    if (!username) return res.err('账号不能为空')
    const query = {}
    if (username) query.username = username
    if (gender) query.gender = gender
    if (role) query.role = role
    if (department) query.department = department
    if (status) query.status = status
    if (phone) query.phone = phone
    if (email) query.email = email
    try {
        const result = await UserInfoModel.findOne({ username }, { runValidators: true })
        if (result) return res.err('账号已存在')
        query.password = bcryptjs.hashSync('admin', 10)
        await UserInfoModel.create(query)
        res.json({ code: 200, message: '用户添加成功, 默认密码为admin' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 修改用户
exports.updateUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { _id, username, gender, role, department, status, phone, email, } = req.body
    if (!_id) return res.err('账号ID不能为空')
    try {
        const data = await UserInfoModel.findOneAndUpdate(
            { _id },
            { username, gender, role, department, status, phone, email, },
            { new: true, runValidators: true })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 删除用户
exports.deleteUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { _id } = req.params
    try {
        _id = new Types.ObjectId(_id);
        const data = await UserInfoModel.findOneAndDelete({ _id })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '删除成功' });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
/**
 * 批量删除用户
 * @returns data
 */
exports.batchDeleteUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let ids = req.body
    try {
        const deleteResults = []
        for (const item of ids) {
            if (!Types.ObjectId.isValid(item._id)) return res.err('ID 无效')
            const _id = new Types.ObjectId(item._id)
            const data = await UserInfoModel
                .findOneAndDelete(
                    { _id },
                    { new: true, projection: { username: 1 } })
            if (data === null) {
                deleteResults.push({ data, message: '删除失败, 账号不存在' })
            } else {
                deleteResults.push({ data, message: '删除成功' })
            }
        }
        res.json({ code: 200, message: '删除完成', data: deleteResults });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
