const fs = require('fs');
const UserModel = require('../models/UserModel');
const UserAvatarModel = require('../models/UserAvatarModel');
const { Types } = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');
const { console } = require('inspector');



/**
 * 用户中心
 * @returns data
 */
exports.userInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    try {
        const data = await UserModel
            .findOne({ username })
            .select({ username: 1, phone: 1, email: 1, avatar: 1, gender: 1, status: 1, signature: 1 })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ message: '查询失败', err });
    }
}
/**
 * 修改用户中心数据
 * @returns data token
 */
exports.updataUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username: oldUsername } = decoded
    if (!oldUsername) return res.err('无效的认证信息')
    // status暂不考虑
    const { avatar, username: newUsername, gender, phone, email, status, signature } = req.body
    try {
        const data = await UserModel.findOneAndUpdate(
            { username: oldUsername },
            { username: avatar, newUsername, gender, phone, email, status, signature },
            { new: true })
        if (data === null) return res.err('账号不存在')
        const user = {
            ...data,
            password: '',
            avatar: '',
        }
        const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey);
        res.json({
            code: 200,
            message: '信息修改成功',
            token: 'Bearer ' + tokenStr
        });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 修改密码
exports.updataPassword = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    let { password, newPassword } = req.body
    if (!password || !newPassword) return res.err('密码不能为空')
    newPassword = bcryptjs.hashSync(newPassword, 10)
    try {
        const data = await UserModel.findOneAndUpdate({ username }, { password: newPassword })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('旧密码错误')
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 上传头像
exports.uploadUserAvatar = async (req, res) => {
    const { username } = req.body;
    if (!username) return res.err('账号不能为空')
    if (!req.file) return res.err('头像未上传')
    const { filename: oldName, originalname: newName } = req.file
    // 文件名可能重复
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
    try {
        const imageId = crypto.randomUUID()
        const imageUrl = `http://127.0.0.1:3007/upload/${newName}`
        const reuslt = await UserAvatarModel.findOne({ username })
        let data;
        if (reuslt) {
            data = await UserAvatarModel
                .findOneAndUpdate(
                    { username },
                    { username, imageUrl, imageId })
        } else {
            data = await UserAvatarModel.create({ username, imageUrl, imageId })
        }
        if (data === null) return res.err('上传失败')
        res.json({ code: 200, message: '上传成功', data })
    } catch (error) {
        res.err('服务器内部错误')
    }
}

// role权限
/**
 * 用户管理
 * @returns data
 */
// 搜索用户
exports.searchUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== 'super' && CtrlRole !== 'admin' && CtrlRole !== 'common') return res.err('角色无权限')
    let { username, phone, email, gender, role, status, skip, limit } = req.body
    skip = typeof skip === 'number' ? skip : 0
    limit = typeof limit === 'number' ? limit : 5
    const query = {}
    if (username) query.username = username
    if (phone) query.phone = phone
    if (email) query.email = email
    if (gender) query.gender = gender
    if (role) query.role = role
    if (status) query.status = status
    try {
        const userInfoList = await UserModel.find(query).skip(skip).limit(limit)
        const total = await UserModel.find().countDocuments()
        const data = {
            userInfoList,
            total
        }
        res.json({ code: 200, message: '查询成功', data });
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
    if (CtrlRole !== 'super' && CtrlRole !== 'admin' && CtrlRole !== 'common') return res.err('角色无权限')
    let { username, role, status, phone, email, gender } = req.body
    if (!username) return res.err('账号不能为空')
    try {
        const result = await UserModel.findOne({ username })
        if (result) return res.err('账号已存在')
        const password = bcryptjs.hashSync('admin', 10)
        await UserModel.create({ username, password, role, status, phone, email, gender })
        res.json({ code: 200, message: '用户添加成功, 默认密码为admin' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 修改用户
exports.editUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: ctrlRole } = decoded
    if (ctrlRole !== 'super' && ctrlRole !== 'admin' && ctrlRole !== 'common') return res.err('角色无权限')
    let { _id, username, role, status, phone, email, gender } = req.body
    if (!_id) return res.err('账号ID不能为空')
    try {
        const data = await UserModel.findOneAndUpdate(
            { _id },
            { username, role, status, phone, email, gender },
            { new: true })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 删除用户
exports.deleteUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== 'super' && CtrlRole !== 'admin' && CtrlRole !== 'common') return res.err('角色无权限')
    let { _id } = req.params
    _id = new Types.ObjectId(_id);
    try {
        const data = await UserModel.findOneAndDelete({ _id })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '删除成功' });
    } catch (error) {
        console.log(error);
        res.err('服务器内部错误')
    }
}
/**
 * 批量删除用户
 * @returns data
 */
exports.deleteUserInfoList = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== 'super' && CtrlRole !== 'admin' && CtrlRole !== 'common') return res.err('角色无权限')
    let ids = req.body
    try {
        const deleteResults = []
        for (const item of ids) {
            if (!Types.ObjectId.isValid(item._id)) return res.err('ID 无效')
            const _id = new Types.ObjectId(item._id)
            const data = await UserModel
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
