const BoardModel = require('../../models/notice/BoardModel');


// 公告管理
/**
 * 获取公告列表 + 搜索
 * @returns data
 */
exports.board = async (req, res) => {
    const { department, level } = req.body
    let { skip = 0, limit = 5 } = req.body
    skip = typeof skip === 'number' ? skip : 0
    limit = typeof limit === 'number' ? limit : 5
    const query = {}
    if (department) query.department = department
    if (level) query.level = level
    try {
        // await BoardModel.create({
        //     title: "上午开会",
        //     category: "公司公告",
        //     department: "技术研发部",
        //     author: "张三",
        //     target: "技术研发部",
        //     level: 1,
        //     content: "上午开会",
        // })
        const boards = await BoardModel.find(query).skip(skip).limit(limit).sort({ createTime: -1 })
        const totalCount = await BoardModel.countDocuments(query)
        const data = {
            boards,
            totalCount
        }
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.err('服务器内部错误')
    }
}

// 发布公告
// 编辑公告
// 删除公告
// 批量删除公告