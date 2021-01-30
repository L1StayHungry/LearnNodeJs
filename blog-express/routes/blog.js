var express = require('express');
var router = express.Router();

const { getList, 
        getDetail, 
        newBlog,
        updateBlog,
        delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleWare/loginCheck')


/* GET home page. */
router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if(req.query.isadmin) {
    //管理员界面
    if(req.session.username == null) {
      //未登录
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    //强制查询自己的博客
    author = req.session.username
  }
  // 返回的是promise
  const result = getList(author,keyword)
  
  return result.then(listData => {
    // return new SuccessModel(listData)
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', (req, res, next) => {
  const id = req.query.id || ''
  const result = getDetail(id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const postData = req.body
  console.log(postData);
  
  // const data = newBlog(postData)
  const result = newBlog(postData)
    return result.then(data => {
      res.json(
        new SuccessModel(data)
      )
    }
  )
});

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('更新博客失败')
      )
    }
  })
});

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id,author)
  return result.then(val => {
    if(val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('删除博客失败')
      )
    }
  })
});

module.exports = router;