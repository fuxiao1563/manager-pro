var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth-middleware');
const companyController = require('../../controllers/system/company-controller')




// 获取公司信息
router.get('/', authMiddleware(), companyController.company)
// 修改公司信息
router.post('/update', authMiddleware(), companyController.updateCompany)


module.exports = router;