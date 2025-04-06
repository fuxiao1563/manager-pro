var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const manageController = require('../controllers/manageController')


// 登录接口
router.post('/user/login', userController.userLogin)
// 注册接口
router.post('/user/regist', userController.userRegist)


// 获取用户列表
router.get('/manage/userInfoList', manageController.getUserInfoList)



module.exports = router;