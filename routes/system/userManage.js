var express = require('express');
var router = express.Router();
const userManageController = require('../../controllers/system/userManageController')

// 获取用户列表接口 + 搜索接口
router.post('/searchUser', userManageController.searchUser)
// 添加用户接口
router.post('/addUser', userManageController.addUser)
// 修改用户接口
router.patch('/updateUser', userManageController.updateUser)
// 删除用户接口
router.delete('/deleteUser/:_id', userManageController.deleteUser)
// 批量删除用户接口
router.post('/batchDeleteUser', userManageController.batchDeleteUser)




module.exports = router;