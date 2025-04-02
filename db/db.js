
/**
 * 
 * @param {*} success 数据库连接成功
 * @param {*} error 数据库连接失败
 */
module.exports = function(success, error){
    const mongoose = require('mongoose');
    const {DBHOST, DBPORT, DBNAME} = require('../config/config');
    if(typeof error !== 'function'){
        error = () => {
            console.log('连接失败~~~');
        }
    }
    // 连接数据库
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
    // 设置回调
    mongoose.connection.once('open', () => {
        success()
        console.log('数据库连接成功');
    })
    mongoose.connection.on('error', () => {
        error()
        console.log('数据库连接失败');
    })
    mongoose.connection.on('close', () => {
        console.log('数据库连接断开');
    })
}
