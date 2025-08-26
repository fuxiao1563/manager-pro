const fs = require('fs');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const UserInfoModel = require('../models/system/user-model');
const UserAvatarModel = require('../models/user-avatar-model');



/**
 * 查询用户信息
 * @returns data
 */
exports.userCenter = async (req, res) => {
    try {
        const { username } = req.user
        if (!username) return res.json({ code: 401, message: '无效的认证信息' })
        const data = await UserInfoModel
            .findOne({ username })
            .select({ username: 1, gender: 1, role: 1, department: 1, phone: 1, email: 1, status: 1, signature: 1 })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
/**
 * 修改用户信息
 * @returns data token
 */
exports.updateUser = async (req, res) => {
    try {
        const { username: oldUsername } = req.user
        if (!oldUsername) return res.json({ code: 401, message: '无效的认证信息' })
        const { username: newUsername, gender, department, phone, email, status, signature } = req.body
        const data = await UserInfoModel.findOneAndUpdate(
            { username: oldUsername },
            { username: newUsername, gender, department, phone, email, status, signature },
            { new: true, runValidators: true })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        const tokenStr = jwt.sign(data.toObject(), jwtConfig.jwtSecretKey);
        res.json({
            code: 200,
            message: '信息修改成功',
            token: 'Bearer ' + tokenStr
        });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
// 修改密码
// exports.updatePassword = async (req, res) => {
//     try {
//         const { _id } = req.user
//         if (!_id) return res.json({ code: 401, message: '无效的认证信息' })
//         let { password, newPassword } = req.body
//         if (!password || !newPassword) return res.json({ code: 400, message: '密码不能为空' })
//         newPassword = bcryptjs.hashSync(newPassword, 10)
//         const data = await UserInfoModel.findOneAndUpdate({ _id }, { password: newPassword }, { runValidators: true })
//         if (data === null) return res.json({ code: 404, message: '账号不存在' })
//         const passwordValid = bcryptjs.compareSync(password, data.password);
//         if (!passwordValid) return res.json({ code: 400, message: '旧密码错误' })
//         res.json({ code: 200, message: '修改成功' })
//     } catch (error) {
//         res.json({ code: 500, message: error.message || '服务器内部错误', })
//     }
// }
// 上传头像
exports.uploadAvatar = async (req, res) => {
    try {
        const { username } = req.user
        if (!username) return res.json({ code: 401, message: '无效的认证信息' })
        if (!req.file) return res.json({ code: 400, message: '头像未上传' })
        const { filename: oldName, originalname: newName } = req.file
        const uploadAvatarDir = './public/upload/avatar'
        await fs.promises.rename(`${uploadAvatarDir}/${oldName}`, `${uploadAvatarDir}/${username}-${newName}`)
        const avatarId = crypto.randomUUID()
        const avatarUrl = `http://localhost:27017/upload/avatar/${username}-${newName}`
        const result = await UserAvatarModel.findOne({ username })
        let data;
        if (result) {
            const oldFileName = result.avatarUrl.split('/').pop();
            const oldFilePath = `${uploadAvatarDir}/${oldFileName}`;
            await fs.promises.unlink(oldFilePath)
            data = await UserAvatarModel
                .findOneAndUpdate(
                    { username },
                    { avatarUrl, avatarId },
                    { new: true, runValidators: true })

        } else {
            data = await UserAvatarModel.create({ username, avatarUrl, avatarId })
        }
        if (data === null) return res.json({ code: 500, message: '上传失败' })
        res.json({ code: 200, message: '上传成功', data })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
