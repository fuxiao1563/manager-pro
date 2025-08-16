const mongoose = require('mongoose')
// 常量
const ENUM = Object.freeze({
    GENDER: ['男', '女', '保密'],
    // GENDER_ENUM: [1, 2, 3],
    ROLE: ['普通用户', '管理员', '超级管理员'],
    STATUS: ['在线', '离线', '隐身'],
})
// 用户信息
const userInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, '用户名至少3个字符'],
        maxlength: [20, '用户名最多10个字符'],
        match: [/^[a-zA-Z0-9_]+$/, '只允许字母、数字和下划线']
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ENUM.GENDER,
        default: '保密',
        // validate: {
        //     validator: v => [0, 1, 2].includes(v),
        //     message: '性别值必须是 0(保密)/1(男)/2(女)'
        // }
        // default: 0,
    },
    role: {
        type: String,
        enum: ENUM.ROLE,
        default: '普通用户',
        //  type: mongoose.Schema.Types.ObjectId,
        // ref: 'Role'
    },
    department: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /^1[3-9]\d{9}$/.test(v) || v === null;
            },
            message: props => `${props.value} 不是有效的手机号码!`
        },
        default: null
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v === null;
            },
            message: props => `${props.value} 不是有效的邮箱地址!`
        },
        default: null
    },
    status: {
        type: String,
        enum: ENUM.STATUS,
        default: '离线'
    },
    signature: {
        type: String,
        default: '这个人很懒，什么都没有留下。'
    }
}, {
    timestamps: true
})
let UserInfoModel = mongoose.model('UserInfo', userInfoSchema)
module.exports = UserInfoModel