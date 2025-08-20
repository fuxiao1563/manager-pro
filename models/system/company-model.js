const mongoose = require('mongoose')
// 公司信息
const companyInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '公司名称是必需的'],
    },
    address: {
        type: String,
        required: [true, '公司地址是必需的'],
    },
    introduce: {
        type: String,
        default: '这个人很懒，什么都没有留下。'
    },
    department:{
        type: Array,
        required: [true, '部门是必需的'],
    }
} ,{
    timestamps: true
})
let CompanyInfoModel = mongoose.model('company', companyInfoSchema)
module.exports = CompanyInfoModel