const mongoose = require('mongoose')
// 角色管理
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: [{
        module: {
            type: String,
            enum: constantRoutes,
            required: true,
        },
        actions: {
            type: [String],
            enum: operationType,
            required: true,
        },
    }],
    description: {
        type: String,
        default: '暂无描述',
    },
    status: {
        type: String,
        enum: [1, 2], // 1: 正常 2: 禁用
        default: 1
    },
})
let RoleModel = mongoose.model('Role', roleSchema)
module.exports = RoleModel