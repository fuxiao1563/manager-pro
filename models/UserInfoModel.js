const mongoose = require('mongoose')
// 用户信息
const userInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },    
    gender: {
        type: String,
        enum: ['男', '女', '保密'],
        default: '保密' 
    },
    role: {
        type: String,
        enum: ['普通用户', '管理员', '超级管理员'],
        default: '普通用户'
    },
    department: {
        type: String,
        default: '未知'
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
    status: {
        type: String,
        enum: ['在线', '离线', '隐身'],
        default: '离线'
    },
    signature: {
        type: String,
        default: '这个人很懒，什么都没有留下。'
    }
})
let UserInfoModel = mongoose.model('UserInfo', userInfoSchema)
module.exports = UserInfoModel