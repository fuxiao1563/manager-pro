const mongoose = require('mongoose')
// 文件管理
const FileManageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
        required: true,
    },
    fileSize: {
        type: Number,
        default: 0,
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: {
        createdAt: 'uploadTime',
        updatedAt: 'updateTime'
    }
})
let FileManageModel = mongoose.model('FileManage', FileManageSchema)
module.exports = FileManageModel