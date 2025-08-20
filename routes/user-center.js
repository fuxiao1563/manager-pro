var express = require('express');
var router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middlewares/auth-middleware');
const userCenterController = require('../controllers/user-center-controller')


const upload = multer({ dest: './public/upload/avatar' });
// 查询用户信息
router.get('/', authMiddleware(), userCenterController.userCenter)
// 修改用户信息
router.patch('/update', authMiddleware(), userCenterController.updateUser)
// 修改密码
router.post('/update-password', authMiddleware(), userCenterController.updatePassword)
// 上传头像
router.post('/upload-avatar', authMiddleware(), upload.single('file'), userCenterController.uploadAvatar)


module.exports = router
