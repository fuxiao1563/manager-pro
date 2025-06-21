var express = require('express');
var router = express.Router();
const companyController = require('../controllers/companyController')




// 获取公司信息
router.get('/companyInfo/companyInfoList', companyController.companyInfoList)
// 修改公司信息
router.post('/companyInfo/editCompanyInfo', companyController.editCompanyInfo)


module.exports = router;