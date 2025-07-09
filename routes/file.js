var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: './public/upload/file' });
const fileController = require('../controllers/fileController');


// 获取文件列表
router.get('/', authMiddleware(), fileController.getFile);
// 上传文件
router.post('/upload', upload.single('file'), authMiddleware(), fileController.uploadFile);
// 删除文件
router.delete('/delete/:_id', authMiddleware(), fileController.deleteFile);




module.exports = router;