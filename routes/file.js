var express = require('express');
var router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const fileController = require('../controllers/file-controller');
const multer = require('multer');
// 修改 multer 配置，解决中文文件名乱码问题
const storage = multer.diskStorage({
  destination: './public/upload/file',
  filename: function (req, file, cb) {
    // 使用原始文件名，解决中文乱码问题
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// 获取文件列表
router.get('/', authMiddleware(), fileController.getFile);
// 上传文件
router.post('/upload', upload.single('file'), authMiddleware(), fileController.uploadFile);
// 删除文件
router.delete('/delete/:_id', authMiddleware(), fileController.deleteFile);




module.exports = router;