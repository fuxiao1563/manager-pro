const { Types } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../jwt-config/index');
const UserInfoModel = require('../../models/system/user-model');



/**
 * 用户管理
 * @returns data
 */
// 用户管理 + 搜索用户
exports.searchUser = async (req, res) => {
    try {
        const { username, gender, role, department, phone, email, status } = req.body
        let { skip = 0, limit = 5 } = req.body
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
        const users = await UserInfoModel.find(query).skip(skip).limit(limit)
        const totalCount = await UserInfoModel.countDocuments(query)
        const data = {
            users,
            totalCount
        }
        res.json({ code: 200, message: '查询成功', data });
    } catch (error) {
        console.error('searchUser error:', error);
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
// 添加用户
exports.addUser = async (req, res) => {
    try {
        const { username, gender, role, department, status, phone, email } = req.body
        if (!username || typeof username !== 'string' || username.trim().length === 0) {
            return res.json({ code: 400, message: '账号不能为空' });
        }
        // 检查账号是否已存在
        const user = await UserInfoModel.findOne({ username })
        if (user) return res.json({ code: 400, message: '账号已存在' })
        // 构建用户对象
        const userData = {
            username: username.trim(),
            password: bcryptjs.hashSync('admin', 10)
        }
        if (phone) userData.phone = phone
        if (gender) userData.gender = gender
        if (role) userData.role = role
        if (department) userData.department = department
        if (status) userData.status = status
        if (email) userData.email = email

        console.log('userData :', userData)
        const result = await UserInfoModel.create(userData)
        console.log('result :', result)
        if (!result) return res.json({ code: 500, message: '用户添加失败' })
        res.json({ code: 200, message: '用户添加成功, 默认密码为admin' })
    } catch (error) {
        console.log('addUser error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
// 修改用户
exports.updateUser = async (req, res) => {
    try {

        let { _id, username, gender, role, department, status, phone, email, } = req.body
        if (!_id) return res.err('账号ID不能为空')
        const data = await UserInfoModel.findOneAndUpdate(
            { _id },
            { username, gender, role, department, status, phone, email, },
            { new: true, runValidators: true })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        console.error('updateUser error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
// 删除用户
exports.deleteUser = async (req, res) => {
    try {

        let { _id } = req.params
        _id = new Types.ObjectId(_id);
        const data = await UserInfoModel.findOneAndDelete({ _id })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        res.json({ code: 200, message: '删除成功' });
    } catch (error) {
        console.error('deleteUser error:', error);
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
/**
 * 批量删除用户
 * @returns data
 */
exports.batchDeleteUser = async (req, res) => {
    try {
        let ids = req.body
        const deleteResults = []
        for (const item of ids) {
            if (!Types.ObjectId.isValid(item._id)) return res.json({ code: 400, message: 'ID 无效' })
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
        console.error('batchDeleteUser error:', error);
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
