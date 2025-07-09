var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const homeController = require('../controllers/homeController');
const layoutController = require('../controllers/layoutController');


// 获取头像
router.get('/avatar', authMiddleware(), homeController.getAvatar)
// 获取全部公告
router.get('/allBoard', authMiddleware(), layoutController.getAllBoard)
// 添加已读
router.put('/addRead/:_id', authMiddleware(), layoutController.addRead)




module.exports = router;