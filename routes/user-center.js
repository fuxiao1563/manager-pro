var express = require('express');
var router = express.Router();
const multer = require('multer');
const userCenterController = require('../controllers/user-center-controller')


const upload = multer({ dest: './public/upload/avatar' });
// 查询用户信息
router.get('/', userCenterController.userCenter)
// 修改用户信息
router.patch('/update', userCenterController.updateUser)
// 修改密码
router.post('/update-password', userCenterController.updatePassword)
// 上传头像
router.post('/upload-avatar', upload.single('file'), userCenterController.uploadAvatar)


module.exports = router
