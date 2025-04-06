const mongoose = require('mongoose')
const userInfoListSchema = new mongoose.Schema({
    username: String,
    gender: {
        type: String,
        default: '男'
    },
    pieName: {
        type: String,
        default: '未知'
    },
    phone: {
        type: String,
        default: '155-xxxx-xxxx'
    },
    email: {
        type: String,
        default: '2459009106@qq.com'
    },
    state: {
        type: String,
        default: '0'
    }
})
let userInfoListModel = mongoose.model('user', userInfoListSchema)
module.exports = userInfoListModel