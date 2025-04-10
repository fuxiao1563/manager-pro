var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 启用所有CORS请求
const cors = require('cors');
app.use(cors()); 
// 或者指定允许的来源
// app.use(cors({ origin: 'http://localhost:5173' }));
// 新建一个upload文件夹用于存储上传图片的请求

const multer = require('multer');
const upload = multer({ dest: './public/upload' });
app.use(upload.any())
// 静态资源托管
app.use(express.static('./public'))
// 引入jwt配置用于加密和解密
const jwtconfig = require('./jwtConfig/index');
// 引入jwt中间件，用于生成token
const {expressjwt:jwt} = require('express-jwt');
app.use(jwt({
  secret: jwtconfig.jwtSecretKey,
  algorithms: ['HS256']
}).unless({
  path: ['/user/login', '/user/regist']
}))
// 引入处理错误中间件
app.use((req, res, next) => {
  res.err = (err, code = 400) => {
    res.send({
      code,
      // 判断err是对象还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next();
});
// 路由
var indexRouter = require('./routes/index');
app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(27017, () => {
  console.log('http://localhost:27017');
})

module.exports = app;
