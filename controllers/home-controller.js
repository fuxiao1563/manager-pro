const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config/index');
const UserInfoModel = require('../models/system/user-model');
const UserAvatarModel = require('../models/user-avatar-model');


/**
 * 主页
 * @returns data
 */
exports.getHome = async (req, res) => {
    try {
        const { username } = req.user
        if (!username) return res.json({ code: 401, message: '无效的认证信息' })
        const data = await UserInfoModel
            .findOne({ username })
            .select({ username: 1, signature: 1 })
        if (data === null) return res.json({ code: 404, message: '账号不存在' })
        res.json({ code: 200, message: '获取成功', data });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}
// 获取头像
exports.getAvatar = async (req, res) => {
    try {
        const { username } = req.user
        if (!username) return res.json({ code: 401, message: '无效的认证信息' })
        const data = await UserAvatarModel
            .findOne({ username })
            .select({ avatarUrl: 1 })
        res.json({ code: 200, message: '获取头像成功', data });
    } catch (error) {
        res.json({ code: 500, message: error.message || '服务器内部错误' });
    }
}
