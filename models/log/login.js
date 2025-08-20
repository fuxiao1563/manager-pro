const mongoose = require('mongoose')
// 登录日志
const LoginLogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, {
    timestamps:{
        createdAt: true,
        updatedAt: false
    }
})
let LoginLogModel = mongoose.model('LoginLog', LoginLogSchema)
module.exports = LoginLogModel