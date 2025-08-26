const { Types } = require('mongoose');
const BoardModel = require('../../models/notice/board-model');


// 获取回收站列表
exports.getBoardBin = async (req, res) => {
    try {
        const data = await BoardModel.find({ isDeleted: true })
            .select({ title: 1, category: 1, department: 1, author: 1, target: 1, level: 1, deletedAt: 1 })
            .sort({ createdAt: -1 })
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        console.error('getBoardBin error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}

// 还原公告
exports.restoreBoard = async (req, res) => {
    try {
        let { _id } = req.params
        if (!Types.ObjectId.isValid(_id)) {
            return res.json({ code: 200, message: '无效ID' });
        }
        _id = new Types.ObjectId(_id);
        const result = await BoardModel.findByIdAndUpdate({ _id },
            { isDeleted: false, deletedAt: null });
        if (!result) return res.json({ code: 200, message: '未找到对应公告' })
        res.json({ code: 200, message: '还原成功' });
    } catch (error) {
        console.error('restoreBoard error:', error);
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}

// 彻底删除
exports.forceDeleteBoard = async (req, res) => {
    try {
        let { _id } = req.params
        if (!Types.ObjectId.isValid(_id)) {
            return res.json({ code: 200, message: '无效ID' });
        }
        _id = new Types.ObjectId(_id);
        const result = await BoardModel.findByIdAndDelete({ _id });
        if (!result) return res.json({ code: 200, message: '未找到对应公告' })
        res.json({ code: 200, message: '彻底删除成功' });
    } catch (error) {
        console.error('forceDeleteBoard error:', error);
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}