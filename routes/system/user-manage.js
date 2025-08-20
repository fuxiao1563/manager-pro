var express = require('express');
var router = express.Router();
const authMiddleware = require('../../middlewares/auth-middleware');
const userManageController = require('../../controllers/system/user-controller')

// 获取用户列表接口 + 搜索接口
router.post('/search',authMiddleware(), userManageController.searchUser)
// 添加用户接口
router.post('/add', authMiddleware(), userManageController.addUser)
// 修改用户接口
router.patch('/update', authMiddleware(), userManageController.updateUser)
// 删除用户接口
router.delete('/delete/:_id', authMiddleware(), userManageController.deleteUser)
// 批量删除用户接口
router.post('/batch-delete', authMiddleware(), userManageController.batchDeleteUser)




module.exports = router;