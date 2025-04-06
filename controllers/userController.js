const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');


// 账号登录
exports.userLogin = (req, res) => {
    const { username, password } = req.body
    // 验证请求体是否包含用户名和密码
    if (!username || !password) {
        return res.json({ message: '账号或密码不能为空' });
    }
    // 查询用户
    UserModel.findOne(req.body).then(data => {
        if (data === null) {
            res.json({ message: '账号或密码错误', data });
            return
        }
        res.json({ code: 200, message: '登录成功', data });
    }).catch(err => {
        res.json({ message: '账号或密码错误', err });
    })
}
// 账号注册
exports.userRegist = (req, res) => {
    let { username, password } = req.body
    // 验证请求体是否包含用户名和密码
    if (!username || !password) {
        return res.json({ message: '账号或密码不能为空' });
    }
    // 查询用户
    UserModel.findOne(req.body).then(data => {
        if (data === null) {
            // 密码加密
            password = bcryptjs.hashSync(password, 10)
            // 创建用户
            UserModel.create({ username, password }).then(data => {
                res.json({ message: '注册成功', data });
            }).catch(err => {
                res.json({ message: '注册失败', err });
            })
            return
        }
        // 账号已存在
        res.json({ message: '账号已存在', data });
    }).catch(err => {
        res.json({ message: '注册失败', err });
    })


}
// 账号注销

// 账号移除 deleteById
// UserModel.deleteOne({
//     username: 'admin'
// }).then(data => {
//     console.log('移除成功', data);
// }).catch(err => {
//     console.log('移除失败', err);
// })
// 更改用户名
// UserModel.updateOne(
//     {
//         username: 'admin111'
//     }, {
//     username: 'admin'
// }).then((data) => {
//     console.log('用户名更改成功', data);
// }).catch((err) => {
//     console.log('用户名更改失败', err);
// });