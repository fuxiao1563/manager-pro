const mongoose = require('mongoose')
// 操作日志
const constantRoutes = ['layout', 'home', 'auth', 'board', 'userCenter', 'system', 'file', 'log', 'document', 'error']
const operationType = ['create', 'update', 'delete', 'read', 'download', 'upload', 'login', 'logout']
const operationSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'UserInfo',
        required: true,
    },
    operationType: {
        module: {
            type: String,
            enum: constantRoutes,
            required: true,
        },
        actions: {
            type: String,
            enum: operationType,
            required: true,
        },
    },
    operationContent: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'operationTime',
        updatedAt: false
    }
})
let OperationModel = mongoose.model('Operation', operationSchema)
module.exports = OperationModel