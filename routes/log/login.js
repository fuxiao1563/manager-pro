var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth-middleware');
const loginLogController = require('../../controllers/log/login');


// 登录日志
router.post('/searchLog', authMiddleware(), loginLogController.searchLog)
// 日志记录
router.post('/recordLog', authMiddleware(), loginLogController.recordLog)
// 清除日志
router.delete('/clearLog', authMiddleware(), loginLogController.clearLog)


module.exports = router;