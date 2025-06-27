const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');


// token验证
module.exports = (options = {}) => {
    // 配置参数
    const {
        allowedRoles = ['超级管理员', '管理员', '普通用户'],
        tokenRequired = true
    } = options

    // 中间件
    return (req, res, next) => {
        try {
            if (!tokenRequired) return next();

            const token = req.headers.authorization?.split(' ')[1]
            if (!token) return res.err('token不存在')

            const decoded = jwt.verify(token, jwtConfig.jwtSecretKey)
            if (!decoded || !decoded.role) return res.err('无效的token')

            const { role: CtrlRole } = decoded
            if (!allowedRoles.includes(CtrlRole)) return res.err('角色无权限')

            // req.user = decoded
            next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') return res.err('token已过期')
            if (error.name === 'JsonWebTokenError') return res.err('无效的token')
            res.err('token验证失败')
        }
    }

}

