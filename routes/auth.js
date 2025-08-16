var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController')


// 登录
router.post('/login', authController.login)
// 注册
router.post('/register', authController.register)
// 退出登录
router.post('/logout', authController.logout)


module.exports = router;