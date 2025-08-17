var express = require('express');
var router = express.Router();
const userManageController = require('../../controllers/system/user-controller')

// 获取用户列表接口 + 搜索接口
router.post('/search', userManageController.searchUser)
// 添加用户接口
router.post('/add', userManageController.addUser)
// 修改用户接口
router.patch('/update', userManageController.updateUser)
// 删除用户接口
router.delete('/delete/:_id', userManageController.deleteUser)
// 批量删除用户接口
router.post('/batch-delete', userManageController.batchDeleteUser)




module.exports = router;