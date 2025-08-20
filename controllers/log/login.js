const { Types } = require('mongoose');
const LoginLogModel = require('../../models/log/login');


/**
 * 日志查询
 * @returns data token
 */
exports.searchLog = async (req, res) => {
    try {
        const { searchParams } = req.body;
        const userId = searchParams && Types.ObjectId.isValid(searchParams) ? searchParams : null;
        const username = searchParams && !Types.ObjectId.isValid(searchParams) ? searchParams : null;
        const query = userId ? { userId } : {}
        const data = await LoginLogModel.find(query)
            .select('-__v -_id')
            .populate(
                {
                    path: 'userId',
                    select: 'username phone email',
                    match: username ? { username: new RegExp(username, 'i') } : {}
                }
            )
            .sort({ createdAt: -1 });
        // 过滤掉 username 匹配不成功时，userId 为 null 的情况
        const filteredData = username
            ? data.filter(item => item.userId)
            : data;
        res.json({ code: 200, message: '获取日志成功', data: filteredData })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}

/**
 * 日志记录
 */
exports.recordLog = async (req, res) => {
    try {
        let { userId } = req
        if (!Types.ObjectId.isValid(userId)) return res.json({ code: 400, message: '无效的ID' })
        userId = new Types.ObjectId(userId);
        const data = await LoginLogModel.create({ userId })
        if (!data) return res.json({ code: 500, message: '日志记录失败' })
        res.json({ code: 201, message: '日志记录成功' })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' })
    }
}

/**
 * 清空日志
 */
exports.clearLog = async (req, res) => {
    try {
        await LoginLogModel.deleteMany();
        res.json({ code: 204, message: '清空日志成功' });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}