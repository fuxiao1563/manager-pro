var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const boardBinController = require('../../controllers/notice/boardBinController')




// 获取公告回收站
router.get('/', authMiddleware(), boardBinController.getBoardBin)
// 还原公告
router.post('/restoreBoard/:_id', authMiddleware(), boardBinController.restoreBoard)
// 彻底删除公告
router.post('/forceDeleteBoard/:_id', authMiddleware(), boardBinController.forceDeleteBoard)


module.exports = router;