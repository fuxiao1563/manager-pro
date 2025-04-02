var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const UserModel = require('../models/UserModel')

// 登录接口
router.post('/login', userController.userLogin)
// 注册接口
router.post('/regist', userController.userRegist)



module.exports = router;