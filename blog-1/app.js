const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

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
  console.log(req.cookie);
  


  // 在进入路由之前，先处理post data
  getPostData(req).then(postData => {
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