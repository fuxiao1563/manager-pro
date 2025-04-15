var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const manageController = require('../controllers/manageController')


const multer = require('multer');
const upload = multer({ dest: './public/upload' });

// POST：用于创建新资源或提交数据，非幂等操作。
// PUT：用于更新现有资源，幂等操作。
// PATCH：用于部分更新资源，幂等操作。

// 登录接口
router.post('/user/login', userController.userLogin)
// 注册接口
router.post('/user/regist', userController.userRegist)
// 退出登录接口
router.post('/user/logout/:username', userController.userLogout)

// 首页接口
router.get('/home/:username', userController.userHome)



// 查询用户信息接口
router.get('/userCenter/userInfo/:username', manageController.userInfo)
// 修改用户信息接口
router.patch('/userCenter/updataUserInfo', manageController.updataUserInfo)
// 修改密码接口
router.post('/userCenter/updataPassword', manageController.updataPassword)
// 上传头像
router.post('/userCenter/uploadUserAvatar', upload.single('file'), manageController.uploadUserAvatar)



// 用户管理接口
router.post('/manage/userInfoList', manageController.userInfoList)
// 删除用户接口
router.delete('/manage/deleteUserInfo/:_id', manageController.deleteUserInfo)
// 批量删除用户接口
router.delete('/manage/deleteUserInfoList', manageController.deleteUserInfoList)
// 添加用户接口
router.post('/manage/addUserInfo', manageController.addUserInfo)
// 编辑用户接口
router.patch('/manage/editUserInfo', manageController.editUserInfo)



module.exports = router;