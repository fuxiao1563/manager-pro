var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const manageController = require('../controllers/manageController')


// 登录接口
router.post('/user/login', userController.userLogin)
// 注册接口
router.post('/user/regist', userController.userRegist)
// 退出登录接口
router.post('/user/logout', userController.userLogout)
// 获取用户信息接口
router.get('/userCenter/userInfoList', userController.userInfoList)
// 修改用户信息接口
router.patch('/userCenter/updataUserInfo', userController.updataUserInfo)

// 上传头像
// router.put('/userCenter/userAvatar', userController.)



module.exports = router;