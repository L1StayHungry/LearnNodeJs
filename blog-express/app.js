var createError = require('http-errors');//处理404
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)

// 引用路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const bolgRouter = require('./routes/blog');
const uesrRouter = require('./routes/user');

// 初始化app
// 每次请求都会生成一个express实例
var app = express();

// view engine setup 视图引擎设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV
if(ENV !== 'production') {
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a' //'a'追加写入，‘w'覆盖写入
  })
  app.use(logger('combined',{
    stream: writeStream
  }));//生成日志
}
// app.use(logger('dev',{
//   stream: process.stdout //日志打印在控制台，默认
// }));//生成日志

app.use(express.json());//解析json格式数据
// 解析Post其他类型数据
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //解析cookie
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
// 解析cookie之前，先解析session
app.use(session({
  secret: 'WJiol_#2345_',
  cookie: {
    path: '/', //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore //关联到redis
}))


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', bolgRouter);
app.use('/api/user', uesrRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
