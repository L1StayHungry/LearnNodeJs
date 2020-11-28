const crypto = require('crypto')

//密钥
const SECRET_KEY = 'WJiol_8776#'

//md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  // .digest('hex'把输出变成16进制的方式
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&{SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}