const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

// 统一执行sql语句的函数
function exec(sql) {
  // 返回操作结果，方便后续操作
  return new Promise((resolve,reject) => {
    con.query(sql,(err,result) => {
      if(err){
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}