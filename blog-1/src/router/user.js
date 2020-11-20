const { login } = require('../controller/user')
const { SuccessModel, ErrorModel} = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method
  
  // 用户登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query;
    const result = login(username, password)
    // if (result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('登录失败')
    // }
    return result.then(result => {
      if(result.username){
        // 操作cookie
        res.setHeader('Set-Cookie',`username=${result.username}; httponly; path=/`)

        return new SuccessModel()
      }
      return new ErrorModel('登陆失败')
    })
  }

  // 登录验证的测试
  if(method === 'GET' && req.path === '/api/user/logintest') {
    if(req.cookie.username){
      return Promise.resolve(new SuccessModel())
    }else {
      return Promise.resolve(new ErrorModel('尚未登录'))
    }
  }
}

module.exports = handleUserRouter