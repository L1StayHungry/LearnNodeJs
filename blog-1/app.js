const querystring = require('querystring')
const { get, set} = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// const getCookieExpries = require('./src/util/getCookieExpries')
const getCookieExpries = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 *1000))
  // console.log(d.toGMTString());
  // Sun, 22 Nov 2020 08:55:34 GMT
  //一种日期格式
  return d.toGMTString()
}

// session数据
// let SESSION_DATA = {}

// 用于处理 post data ，若是POST请求且存在data ,则返回JSON.parse(postData)
const getPostData = (req) => {
  return new Promise((resolve,reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }
    if(req.headers['content-type' !== 'application/json']) {
      resolve({})
      return
    }
    // 获取客户端传过来的数据
    let postData = ''
    req.on('data',chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

const serverHandle = (req,res) => {
  //设置返回格式
  res.setHeader('Content-type','application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])
  

  //解析cookie
  req.cookie = {}  //解析后的cookie放到这里
  const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2
  cookieStr.split(';').forEach(item => {
    if(!item){
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim(' ')
    const val = arr[1].trim(' ')
    req.cookie[key] = val
  })
  // console.log(req.cookie);
  
  // 解析session
  /**
   * userId是标识某个用户(浏览器)的唯一标识
   * 该用户在server端的缓存信息记录在SESSION_DATA[用户id]处
   * 
   * 逻辑：
   * 1.该用户是否已经拥有userid(首次访问)
   * 2.如果是首次访问，赋予userId,并初始化对应的SESSION_DATA[userId]
   * 3.将SESSION_DATA[userId]赋值给本次访问的req.session
   * 4.后续操作对req.session进行访问查询
   */
  let needSetCookie = false //是否首次登录，若是，赋予userId时需要设置cookie
  let userId = req.cookie.userid
  if(!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`
    // 初始化redis里面的session
    set(userId, {})
  } 
  // 获取redis中的session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if(sessionData == null) {
      // 初始化redis里面的session
      set(userId, {})
      // 设置session
      req.session = {}
    }else{
      req.session = sessionData
    }
    // 在进入路由之前，先处理post data
    return getPostData(req)
  }).then(postData => {
    // 所有路由可以通过req.body来获取postData
    req.body = postData

    /**
     * 获取到postData后再进入路由
     */
    // 处理blog路由
    // handleBlogRouter返回的是promise
    const blogResult = handleBlogRouter(req,res)
    if(blogResult){
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; httpOnly; path=/ ;expires=${getCookieExpries}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    
    // 处理user路由
    const userResult = handleUserRouter(req,res)
    if(userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; httpOnly; path=/ ;expires=${getCookieExpries()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 未命中路由，返回404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
    /** 
     * 获取到postData后再进入路由
     */
  })
}

module.exports = serverHandle

// env: process.env.NODE_ENV