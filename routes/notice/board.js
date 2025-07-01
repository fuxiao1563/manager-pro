var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const boardController = require('../../controllers/notice/boardController')




// 获取公告列表 + 搜索
router.post('/', authMiddleware(), boardController.getBoard)
// 发布公告
router.post('/addBoard', authMiddleware(), boardController.addBoard)
// 修改公告
router.post('/updateBoard', authMiddleware(), boardController.updateBoard)
// 删除公告
router.post('/deleteBoard/:_id', authMiddleware(), boardController.deleteBoard)
// 批量删除公告
router.post('/batchDeleteBoard', authMiddleware(), boardController.batchDeleteBoard)


module.exports = router;