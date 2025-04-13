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
    phone: {
        type: String,
        // unique: true,
        minlength: [11, '要求手机号长度为11位'],
        maxlength: [11, '要求手机号长度为11位'],
        // validate: {
        //     validator: function (value) {
        //         return /^1[3-9]\d{9}$/.test(value)
        //     },
        //     message: '手机号格式不正确'
        // },
        default: 'xxxxxxxxxxx'
    },
    gender: {
        type: String,
        enum: ['男', '女', '未知'],
        default: '未知'
    },
    email: {
        type: String,
        // unique: true,
        default: '未知'
    },
    role: {
        type: String,
        enum: ['common', 'admin', 'super'],
        default: 'common'
    },
    avatar: {
        type: String,
        default: 'https://img.yzcdn.cn/vant/cat.jpeg'
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