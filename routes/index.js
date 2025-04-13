var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')


// 登录接口
router.post('/user/login', userController.userLogin)
// 注册接口
router.post('/user/regist', userController.userRegist)
// 退出登录接口
router.post('/user/logout/:username', userController.userLogout)
// 查询用户信息接口
router.get('/userCenter/userInfo/:username', userController.userInfo)
// 修改用户信息接口
router.patch('/userCenter/updataUserInfo', userController.updataUserInfo)
// 用户管理接口
router.post('/manage/userInfoList', userController.userInfoList)
// 删除用户接口
router.delete('/manage/deleteUserInfo/:_id', userController.deleteUserInfo)
// 添加用户接口
router.post('/manage/addUserInfo', userController.addUserInfo)
// 上传头像
// router.put('/userCenter/userAvatar', userController.)



module.exports = router;