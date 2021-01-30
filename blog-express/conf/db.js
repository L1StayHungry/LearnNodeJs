const env = process.env.NODE_ENV //获取环境变量，根据环境变量配置数据库

let MYSQL_CONF = {}
let REDIS_CONF = {}

// 本地
if(env === 'dev'){
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lhjMySql',
    port: '3306',
    database: 'myblog' //数据库名称
  }
  //redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}
// 线上
if(env === 'production'){
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lhjMySql',
    port: '3306',
    database: 'myblog' //数据库名称
  }
  //redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}