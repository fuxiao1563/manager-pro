const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');
const CompanyInfoModel = require('../models/CompanyInfoModel');


/**
 * 公司管理
 * @returns data
 */
exports.companyInfoList = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    try {
        const data = await CompanyInfoModel.findOne()
        res.json({ code: 200, message: '查询成功', data })
    } catch (error) {
        res.err('服务器内部错误')
    }
}


// 修改公司信息
exports.editCompanyInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.err('token不存在')
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
    const { role: CtrlRole } = decoded
    if (CtrlRole !== '超级管理员' && CtrlRole !== '管理员' && CtrlRole !== '普通用户') return res.err('角色无权限')
    let { name, address, introduce, department } = req.body
    if (!name) return res.err('公司名不能为空')
    if (!address) return res.err('公司地址不能为空')
    if (!Array.isArray(department) || department.length === 0) return res.err('公司部门不能为空且必须是非空数组')
    try {
        const data = await CompanyInfoModel.findOneAndUpdate(
            {},
            { name, address, introduce, department },
            { new: true, runValidators: true }
        )
        res.json({ code: 200, message: '修改成功', data })
    } catch (error) {
        res.err(error)
    }
}