const mongoose = require('mongoose')
// 用户头像
const userAvatarSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatarUrl: {
        type: String,
        required: [true, '图像链接是必需的'],
        // validate: {
        //     validator: function(value) {
        //         return /^https?:\/\/.+/.test(value);
        //     },
        //     message: props => `${props.value} 不是一个有效的 URL`
        // }
    },
    avatarId: {
        type: String,
        required: [true, '图像ID是必需的'],
        unique: true
    }
},{
    timestamps: true
})
let UserAvatarModel = mongoose.model('UserAvatar', userAvatarSchema)
module.exports = UserAvatarModel