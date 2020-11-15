const env = process.env.NODE_ENV //获取环境变量，根据环境变量配置数据库

let MYSQL_CONF = {}

if(env === 'dev'){
  YSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lhjMySql',
    port: '3306',
    database: 'myblog' //数据库名称
  }M
}

if(env === 'production'){
  YSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lhjMySql',
    port: '3306',
    database: 'myblog' //数据库名称
  }
}

module.exports = {
  MYSQL_CONF
}