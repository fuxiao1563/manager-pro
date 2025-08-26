const { Types } = require('mongoose');
const BoardModel = require('../../models/notice/board-model');


// 公告管理
/**
 * 获取公告列表 + 搜索
 * @returns data
 */
exports.getBoard = async (req, res) => {
    try {
        const { target, level } = req.body
        let { skip = 0, limit = 5 } = req.body
        skip = typeof skip === 'number' ? skip : 0
        limit = typeof limit === 'number' ? limit : 5
        const query = { isDeleted: false }
        if (target) query.target = target
        if (level) query.level = level
        const boards = await BoardModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 })
        const totalCount = await BoardModel.countDocuments(query)
        const data = {
            boards,
            totalCount
        }
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        console.error('getBoard error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}

// 发布公告
exports.addBoard = async (req, res) => {
    try {
        const { title, category, department, author, target, level, content } = req.body
        if (!title || !category || !department || !author || !target || !level || !content) return res.json({ code: 400, message: '参数错误' })
        const data = await BoardModel.create({
            title, category, department, author, target, level, content
        })
        res.json({ code: 201, message: '发布成功' })
    } catch (error) {
        console.error('addBoard error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}
// 修改公告
exports.updateBoard = async (req, res) => {
    try {
        const { _id, title, category, department, author, target, level, content } = req.body
        const data = await BoardModel.updateOne({ _id },
            { title, category, department, author, target, level, content },
            { new: true, runValidators: true })
        res.json({ code: 200, message: '修改成功' })
    } catch (error) {
        console.error('updateBoard error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}
// 删除公告
exports.deleteBoard = async (req, res) => {
    try {
        let { _id } = req.params
        _id = new Types.ObjectId(_id);
        const data = await BoardModel.findByIdAndUpdate({ _id },
            { isDeleted: true, deletedAt: Date.now() })
        if (data === null) return res.json({ code: 404, message: '公告不存在' })
        res.json({ code: 200, message: '删除成功' })
    } catch (error) {
        console.error('deleteBoard error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}
// 批量删除公告
exports.batchDeleteBoard = async (req, res) => {
    try { // 前置验证
        let ids = req.body
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.json({ code: 400, message: '请提供有效的公告ID数组' });
        }
        // 验证所有ID
        const invalidIds = ids.filter(item => !Types.ObjectId.isValid(item._id));
        if (invalidIds.length > 0) {
            return res.json({ code: 400, message: `包含无效ID: ${invalidIds.map(item => item._id).join(', ')}` });
        }
        const objIds = ids.map(item => new Types.ObjectId(item._id))
        const result = await BoardModel.updateMany({ _id: { $in: objIds } },
            { isDeleted: true, deletedAt: Date.now() }
        )
        if (result.deletedCount === 0) return res.json({ code: 404, message: '公告不存在' })
        res.json({ code: 200, message: `成功删除${result.deletedCount}条公告` })
    } catch (error) {
        console.error('batchDeleteBoard error:', error)
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}