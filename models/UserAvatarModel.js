const mongoose = require('mongoose')
// 用户头像
const userAvatarSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '用户名是必需的'],
        minlength: [5, '用户名长度至少5位'],
        maxlength: [10, '用户名长度至多10位'],
    },
    imageUrl: {
        type: String,
        required: [true, '图像链接是必需的'],
        // validate: {
        //     validator: function(value) {
        //         return /^https?:\/\/.+/.test(value);
        //     },
        //     message: props => `${props.value} 不是一个有效的 URL`
        // }
    },
    imageId: {
        type: String,
        required: [true, '图像ID是必需的'],
        unique: true
    }
})
let UserAvatarModel = mongoose.model('UserAvatar', userAvatarSchema)
module.exports = UserAvatarModel