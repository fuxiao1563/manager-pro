const { Types } = require('mongoose');
const BoardModel = require('../models/notice/board-model');


// 获取全部公告
exports.getAllBoard = async (req, res) => {
    try {
        const data = await BoardModel.find({ isDeleted: false })
            .select({ title: 1, level: 1, content: 1, createdAt: 1, isRead: 1 })
            .sort({ createdAt: -1 })
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}
// 添加已读公告
exports.addRead = async (req, res) => {
    let { _id } = req.params
    try {
        if (!Types.ObjectId.isValid(_id)) {
            return res.json({ code: 400, message: '无效ID' });
        }
        _id = new Types.ObjectId(_id);
        await BoardModel.updateOne({ _id },
            { $set: { isRead: true } })
        res.json({ code: 200, message: '添加已读成功' })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}