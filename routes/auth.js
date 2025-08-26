var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth-controller')


// 登录
router.post('/login', authController.login)
// 注册
router.post('/register', authController.register)
// 退出登录
router.post('/logout',  authController.logout)
// 获取验证码
router.post('/send-code', authController.sendCode);
// 验证码登录 / 注册
router.post('/code-login', authController.codeLogin);
// 忘记密码
router.post('/reset-password', authController.resetPassword);

module.exports = router;