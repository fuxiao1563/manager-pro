const mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, '账号长度至少5位'],
        maxlength: [10, '账号长度至多10位'],
    },
    password: {
        type: String,
        required: true,
        // minlength: [5, '密码长度至少5位'],
        // maxlength: [10, '密码长度至多10位'],
    },
})
let UserModel = mongoose.model('User', userSchema)
module.exports = UserModel