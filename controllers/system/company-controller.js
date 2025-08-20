const jwt = require('jsonwebtoken');
const jwtConfig = require('../../jwt-config/index');
const CompanyInfoModel = require('../../models/system/company-model');


/**
 * 公司管理
 * @returns data
 */
exports.company = async (req, res) => {
    try {
        const data = await CompanyInfoModel.findOne()
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}


// 修改公司信息
exports.updateCompany = async (req, res) => {
    try {
        let { name, address, introduce, department } = req.body
        if (!name) return res.json({ code: 400, message: '公司名不能为空' })
        if (!address) return res.json({ code: 400, message: '公司地址不能为空' })
        if (!Array.isArray(department) || department.length === 0) return res.json({ code: 400, message: '公司部门不能为空且必须是非空数组' })
        const data = await CompanyInfoModel.findOneAndUpdate(
            {},
            { name, address, introduce, department },
            { new: true, runValidators: true, upsert: true }
        )
        if (!data) return res.json({ code: 500, message: '修改失败' })
        res.json({ code: 200, message: '修改成功', data })
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误', })
    }
}