var express = require('express');
var router = express.Router();
const companyController = require('../../controllers/system/company-controller')




// 获取公司信息
router.get('/', companyController.company)
// 修改公司信息
router.post('/update', companyController.updateCompany)


module.exports = router;