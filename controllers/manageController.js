const userInfoListModel = require('../models/ManageModel');

exports.getUserInfoList = (req, res) => {
    userInfoListModel.find().then(data => {
        res.json({ code: 200, message: '查询成功', data });
    }).catch(err => {
        res.json({ message: '查询失败', err });
    })
}