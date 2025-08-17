const mongoose = require('mongoose')
// 常量
const ENUM = Object.freeze({
    LEVEL: [1, 2, 3],
})
// 公告信息
const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '公告标题是必需的'],
    },
    category: {
        type: String,
        required: [true, '公司类别是必需的'],
    },
    department: {
        type: String,
        default: null
    },
    author: {
        type: String,
        required: [true, '发布人是必需的'],
    },
    target: {
        type: String,
        default: null
    },
    level: {
        type: Number,
        enum: ENUM.LEVEL,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: [true, '公告内容是必需的'],
    },
    isRead:{
        type: Boolean,
        default: false
    },    
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})
let BoardModel = mongoose.model('board', boardSchema)
module.exports = BoardModel