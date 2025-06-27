var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const boardController = require('../../controllers/notice/boardController')




// 获取公告列表 + 搜索
router.post('/', authMiddleware(), boardController.board)


module.exports = router;