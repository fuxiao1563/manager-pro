var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const authController = require('../controllers/auth-controller')


// 登录
router.post('/login', authMiddleware(), authController.login)
// 注册
router.post('/register', authMiddleware(), authController.register)
// 退出登录
router.post('/logout', authMiddleware(), authController.logout)


module.exports = router;