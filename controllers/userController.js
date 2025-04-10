const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwtConfig/index');

// 账号注册
exports.userRegist = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')

    await UserModel.findOne({ username }).then(data => {
        if (data === null) {
            password = bcryptjs.hashSync(password, 10)
            UserModel.create({ username, password }).then(data => {
                res.json({ code: 200, message: '账号注册成功' });
            }).catch(err => {
                res.err(err)
            })
            return
        }
        res.err('账号已存在')
    }).catch(err => {
        res.err('服务器内部错误')
    })
}
// 账号登录
exports.userLogin = async (req, res) => {
    let { username, password } = req.body
    if (!username || !password) return res.err('账号或密码不能为空')
    await UserModel.findOneAndUpdate({ username }, { status: 'online' }).then(data => {
        if (data === null) return res.err('账号不存在')
        const passwordValid = bcryptjs.compareSync(password, data.password);
        if (!passwordValid) return res.err('账号密码错误')
        // if (data.status === 'online') return res.err('账号已登录')
        // 返回token
        const user = {
            ...data,
            password: '',
            avatar: '',
        }
        const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey,); // { expiresIn: '3h' }
        res.json({
            code: 200,
            message: '账号登录成功',
            data,
            token: 'Bearer ' + tokenStr
        });
    }).catch(err => {
        res.err('服务器内部错误')
    })
}
// 退出登录
exports.userLogout = async (req, res) => {
    const { username } = req.body;
    await UserModel.findOneAndUpdate({ username }, { status: 'outline' }).then(data => {
        console.log(data);
        if (data === null) return res.err('账号不存在')
        if (data.status === 'outline') return res.err('账号已退出')
        res.json({ code: 200, message: '账号退出成功', data });
    }).catch(err => {
        res.err('服务器内部错误')
    })
}
// 查询用户信息
exports.userInfoList = async (req, res) => {
    let username = req.query.username;
    await UserModel.findOne({ username }).then(data => {
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '查询成功', data })
    }).catch(err => {
        res.json({ message: '查询失败', err });
    })
}
//修改用户信息
exports.updataUserInfo = async (req, res) => {
    // status暂不考虑
    let { username, phone, gender, email, role, avatar } = req.body
    if (!phone) return res.err('手机号不能为空')
    await UserModel.findOneAndUpdate({ username }, { username, phone, gender, email, role, avatar }).then(data => {
        if (data === null) return res.err('账号不存在')
        res.json({ code: 200, message: '修改成功' })
    }).catch(err => {
        res.err('服务器内部错误')
    })
}

// 上传头像
exports.uploadAvatar = (req, res) => {
    res.json({ message: '上传成功', data: req.file });
}