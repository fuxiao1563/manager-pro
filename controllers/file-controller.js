const fs = require('fs');
const { Types } = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const FileManageModel = require('../models/file-model');
const UserInfoModel = require('../models/system/user-model');


const uploadFileDir = './public/upload/file'
/**
 * 文件管理
 * @returns data
 */
exports.getFile = async (req, res) => {
    try {
        const data = await FileManageModel.find().populate('userId', 'username')
        res.json({ code: 200, message: '文件获取成功', data });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}
/**
 * 文件上传
 * @returns data
 */
exports.uploadFile = async (req, res) => {
    try {
        const { size, originalname, filename } = req.file
        const username = req.user.username;
        await fs.promises.rename(
            path.join(uploadFileDir, filename),
            path.join(uploadFileDir, `${username}-${originalname}`)
        )
        const user = await UserInfoModel.findOne({ username })
        if (!user) return res.status(404).json({ error: '用户不存在' })
        const data = await FileManageModel.create({
            userId: user._id,
            fileName: originalname,
            fileSize: size,
        })
        if (!data) return res.json({ code: 500, message: '文件上传失败' })
        res.json({ code: 200, message: '文件上传成功' });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}
/**
 * 文件删除
 * @returns data
 */
exports.deleteFile = async (req, res) => {
    try {
        let { _id } = req.params;
        if (!Types.ObjectId.isValid(_id)) {
            return res.json({ code: 400, message: '无效ID' });
        }
        _id = new Types.ObjectId(_id);
        // 删除文件
        const fileData = await FileManageModel.findById(_id)
        const userData = await UserInfoModel.findById(fileData.userId);
        const fileName = `${userData.username}-${fileData.fileName}`;
        await fs.promises.unlink(path.join(uploadFileDir, fileName));
        // 删除数据库记录
        const data = await FileManageModel.findByIdAndDelete({ _id });
        if (data === null) return res.json({ code: 404, message: '文件不存在' });
        return res.json({ code: 200, message: '文件删除成功' });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}