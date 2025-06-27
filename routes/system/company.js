var express = require('express');
var router = express.Router();
const companyController = require('../../controllers/system/companyController')




// 获取公司信息
router.get('/', companyController.company)
// 修改公司信息
router.post('/updateCompany', companyController.updateCompany)


module.exports = router;