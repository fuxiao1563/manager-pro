const mongoose = require('mongoose')
// 用户登录信息
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['common', 'admin', 'super'],
        default: 'common'
    },
    phone: {
        type: String,
        minlength: [11, '要求手机号长度为11位'],
        maxlength: [11, '要求手机号长度为11位'],
        default: 'xxxxxxxxxxx'
    },
    email: {
        type: String,
        default: '未知'
    },
    gender: {
        type: String,
        enum: ['男', '女', '未知'],
        default: '未知'
    },
    status: {
        type: String,
        enum: ['online', 'outline', 'hidden'],
        default: 'outline'
    },
    signature: {
        type: String,
        default: '这个人很懒，什么都没有留下。'
    }
})
let UserModel = mongoose.model('User', userSchema)
module.exports = UserModel