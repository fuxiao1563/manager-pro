const fs = require('fs');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');
const UserInfoModel = require('../models/UserInfoModel');
const UserAvatarModel = require('../models/UserAvatarModel');



/**
 * 查询用户信息
 * @returns data
 */
exports.userCenter = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    try {
        const data = await UserInfoModel
            .findOne({ username })
            .select({ username: 1, gender: 1, role: 1, department: 1, phone: 1, email: 1, status: 1, signature: 1 })
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ message: '查询失败', err });
    }
}
/**
 * 修改用户信息
 * @returns data token
 */
exports.updateUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username: oldUsername } = decoded
    if (!oldUsername) return res.err('无效的认证信息')
    const { username: newUsername, gender, department, phone, email, status, signature } = req.body
    try {
        const data = await UserInfoModel.findOneAndUpdate(
            { username: oldUsername },
            { username: newUsername, gender, department, phone, email, status, signature },
            { new: true, runValidators: true })
        if (data === null) return res.err('账号不存在')
        const tokenStr = jwt.sign(data.toObject(), jwtConfig.jwtSecretKey);
        res.json({
            code: 200,
            message: '信息修改成功',
            token: 'Bearer ' + tokenStr
        });
    } catch (error) {
        res.err(error)
    }
}
// 修改密码
exports.updatePassword = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    let { password, newPassword } = req.body
    if (!password || !newPassword) return res.err('密码不能为空')
    newPassword = bcryptjs.hashSync(newPassword, 10)
    try {
        const data = await UserInfoModel.findOneAndUpdate({ username }, { password: newPassword }, { runValidators: true })
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('旧密码错误')
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        res.err('服务器内部错误')
    }
}
// 上传头像
exports.uploadAvatar = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { username } = decoded
    if (!username) return res.err('无效的认证信息')
    if (!req.file) return res.err('头像未上传')
    const { filename: oldName, originalname: newName } = req.file
    fs.renameSync(`./public/upload/${oldName}`, `./public/upload/${username}-${newName}`)
    try {
        const avatarId = crypto.randomUUID()
        const avatarUrl = `http://localhost:27017/upload/${username}-${newName}`
        const reuslt = await UserAvatarModel.findOne({ username })
        let data;
        if (reuslt) {
            data = await UserAvatarModel
                .findOneAndUpdate(
                    { username },
                    { avatarUrl, avatarId },
                    { new: true, runValidators: true })
        } else {
            data = await UserAvatarModel.create({ username, avatarUrl, avatarId })
        }
        if (data === null) return res.err('上传失败')
        res.json({ code: 200, message: '上传成功', data })
    } catch (error) {
        res.err(error)
    }
}
