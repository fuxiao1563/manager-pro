var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');


// 获取首页
router.get('/', homeController.getHome);
// 获取头像
router.get('/avatar', homeController.getAvatar)




module.exports = router;