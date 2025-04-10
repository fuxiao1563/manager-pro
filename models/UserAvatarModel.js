const mongoose = require('mongoose')
// 用户头像
const userAvatarSchema = new mongoose.Schema({
    imageUrl:{
        type: String,
        required: [true, '图像链接是必需的'],
        validate: {
            validator: function(value) {
                return /^https?:\/\/.+/.test(value); // 简单验证 URL 格式
            },
            message: props => `${props.value} 不是一个有效的 URL`
        }
    },
    username:{
        type: String,
        required: [true, '用户名是必需的'],
        minlength: [5, '用户名长度至少5位'],
        maxlength: [10, '用户名长度至多10位'],
    },
    onlyid:{
        type: String,
        required: true,
        unique: true,
    }
})
let UserAvatarModel = mongoose.model('UserAvatar', userAvatarSchema)
module.exports = UserAvatarModel