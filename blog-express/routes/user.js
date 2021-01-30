var express = require('express');
var router = express.Router();

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel} = require('../model/resModel')
// const { set } = require('../db/redis')

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
    // const { username, password } = req.query;
    const result = login(username, password)
    // if (result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('登录失败')
    // }
    return result.then(result => {
      if(result.username){
        // 操作cookie
        // res.setHeader('Set-Cookie',`username=${result.username}; httpOnly; path=/ ;expires=${getCookieExpries()}`)
        // 设置session
        req.session.username = result.username
        req.session.realname = result.realname

        // 同步到 redis
        //express-session会插件自动同步到redis
        // set(req.sessionId, req.session)
        
        res.json(
          new SuccessModel()
        )
        return
      }
      res.json(
        new ErrorModel('登陆失败')
      )
    })
});

// router.get('/login-test',(req, res, next) => {
//   if(req.session.username) {
//     res.json({
//       errno: 0,
//       msg: '已登录'
//     })
//     return
//   }

//   res.json({
//     errno: -1,
//     msg: '未登录'
//   })
// })

module.exports = router;