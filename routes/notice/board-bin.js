var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth-middleware');
const boardBinController = require('../../controllers/notice/board-bin-controller')




// 获取公告回收站
router.get('/', authMiddleware(), boardBinController.getBoardBin)
// 还原公告
router.post('/restore/:_id', authMiddleware(), boardBinController.restoreBoard)
// 彻底删除公告
router.post('/force-delete/:_id', authMiddleware(), boardBinController.forceDeleteBoard)


module.exports = router;