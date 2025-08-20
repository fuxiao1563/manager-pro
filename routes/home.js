var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const homeController = require('../controllers/home-controller');


// 获取首页
router.get('/', authMiddleware(), homeController.getHome);
// 获取头像
router.get('/avatar', authMiddleware(), homeController.getAvatar);




module.exports = router;