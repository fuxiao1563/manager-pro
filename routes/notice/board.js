var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth-middleware');
const boardController = require('../../controllers/notice/board-controller')




// 获取公告列表 + 搜索
router.post('/', authMiddleware(), boardController.getBoard)
// 发布公告
router.post('/add', authMiddleware(), boardController.addBoard)
// 修改公告
router.post('/update', authMiddleware(), boardController.updateBoard)
// 删除公告
router.post('/delete/:_id', authMiddleware(), boardController.deleteBoard)
// 批量删除公告
router.post('/batch-delete', authMiddleware(), boardController.batchDeleteBoard)


module.exports = router;