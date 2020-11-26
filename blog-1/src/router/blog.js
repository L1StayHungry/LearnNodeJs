const { getList, 
        getDetail, 
        newBlog,
        updateBlog,
        delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = (req) => {
  if(!req.session.username){
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  

  //获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 假数据
    // const listData = getList(author,keyword)
    // return new SuccessModel(listData)
    if(req.query.isadmin) {
      //管理员界面
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult) {
        //未登录
        return loginCheckResult
      }
      //强制查询自己的博客
      author = req.session.username
    }
    // 返回的是promise
    const result = getList(author,keyword)
    
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  //获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail( )
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    //登录验证
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    req.body.author = req.session.username
    const postData = req.body
    // const data = newBlog(postData)
    const result = newBlog(postData)
      return result.then(data => {
        return new SuccessModel(data)
      }
    )
    // return new SuccessModel(data)
  }
  
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    //登录验证
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const result = updateBlog(id, req.body)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
    
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    //登录验证
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const author = req.session.username
    const result = delBlog(id,author)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
  
}

module.exports = handleBlogRouter