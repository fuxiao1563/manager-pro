var express = require('express');
var router = express.Router();
const multer = require('multer');
const userCenterController = require('../controllers/userCenterController')


const upload = multer({ dest: './public/upload/avatar' });
// 查询用户信息
router.get('/', userCenterController.userCenter)
// 修改用户信息
router.patch('/updateUser', userCenterController.updateUser)
// 修改密码
router.post('/updatePassword', userCenterController.updatePassword)
// 上传头像
router.post('/uploadAvatar', upload.single('file'), userCenterController.uploadAvatar)


module.exports = router
