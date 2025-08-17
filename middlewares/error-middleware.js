// 错误处理中间件
module.exports = () => {
    return(req, res, next) => {
        res.err = (err, code = 400) => {
          res.send({
            code,
            // 判断err是对象还是字符串
            message: err instanceof Error ? err.message : err
          })
        }
        next();
      }

}