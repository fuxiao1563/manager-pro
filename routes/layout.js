var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const homeController = require('../controllers/home-controller');
const layoutController = require('../controllers/layout-controller');


// 获取头像
router.get('/avatar', authMiddleware(), homeController.getAvatar)
// 获取全部公告
router.get('/all-board', authMiddleware(), layoutController.getAllBoard)
// 添加已读
router.put('/add-read/:_id', authMiddleware(), layoutController.addRead)




module.exports = router;