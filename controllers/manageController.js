const fs = require('fs');
const UserModel = require('../models/UserModel');
const UserAvatarModel = require('../models/UserAvatarModel');
const { Types } = require('mongoose');
const bcryptjs = require('bcryptjs');



// 用户中心
exports.userInfo = async (req, res) => {
    let { username } = req.params;
    if (!username) return res.err('账号不能为空')
    try {
        const data = await UserModel
            .findOne({ username })
            .select({ username: 1, phone: 1, email: 1, avatar: 1, gender: 1, status: 1 })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ message: '查询失败', err });
    }
}
// 修改用户中心数据
exports.updataUserInfo = async (req, res) => {
    // status暂不考虑
    let { username, phone, gender, email, role, avatar } = req.body
    if (!username) return res.err('账号不能为空')
    try {
        const data = await UserModel.findOneAndUpdate(
            { username },
            { username, phone, gender, email, role, avatar })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 修改密码
exports.updataPassword = async (req, res) => {
    let { username, password, newPassword } = req.body
    if (!username) return res.err('账号不能为空')
    newPassword = bcryptjs.hashSync(newPassword, 10)
    try {
        const data = await UserModel.findOneAndUpdate({ username }, { password: newPassword })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('密码错误')
        res.json({ code: 200, message: '修改成功', data })
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

// 用户管理
exports.userInfoList = async (req, res) => {
    let { skip, limit } = req.body
    if (!skip) skip = 0
    if (!limit) limit = 5
    try {
        const userInfoList = await UserModel
            .find()
            .select({ username: 1, role: 1, phone: 1, email: 1, avatar: 1, gender: 1, status: 1 })
            .skip(skip).limit(limit)
        const total = await UserModel.find().countDocuments()
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
    let { username, gender, phone, email } = req.body
    if (!username) return res.err('账号不能为空')
    try {
        const result = await UserModel.findOne({ username })
        if (result) return res.err('账号已存在')
        const password = bcryptjs.hashSync('admin', 10)
        await UserModel.create({ username, password, gender, phone, email })
        res.json({ code: 200, message: '用户添加成功, 默认密码为admin' });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 删除用户
exports.deleteUserInfo = async (req, res) => {
    let { _id } = req.params
    _id = new Types.ObjectId(_id);
    try {
        await UserModel.findOneAndDelete({ _id })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '删除成功' });
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 批量删除用户
exports.deleteUserInfoList = async (req, res) => {
    let ids = req.body
    console.log("body", req.body);
    console.log("ids", ids);
    try {
        const deleteResults = []
        for (const id of ids) {
            const _id = new Types.ObjectId(id._id)
            const data = await UserModel
                .findOneAndDelete({ _id }, { new: true, projection: { username: 1 } })
            if (data === null) {
                deleteResults.push({ data, message: '删除失败, 账号不存在' })
                res.err('删除失败, 账号不存在')
            } else {
                deleteResults.push({ data, message: '删除成功' })
                res.json({ code: 200, message: '删除成功', data: deleteResults });
            }
        }
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 编辑用户
exports.editUserInfo = async (req, res) => {
    let { _id, username, role, phone, email, gender, status } = req.body
    if (!_id) return res.err('账号id不能为空')
    try {
        const data = await UserModel.findOneAndUpdate(
            { _id },
            { username, role, phone, email, gender, status },
            { new: true })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '修改成功', data })
    } catch (error) {
        res.err('服务器内部错误')
    }
}