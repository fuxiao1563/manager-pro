const mongoose = require('mongoose')
// 验证码登录
const AuthCodeSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^1[3-9]\d{9}$/.test(v);
            },
            message: props => `${props.value} 不是有效的手机号码!`
        },
        unique: true
    },
    code: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
        expires: 300
    }
}, {
    timestamps: true
})
let AuthCodeModel = mongoose.model('AuthCode', AuthCodeSchema)
module.exports = AuthCodeModel