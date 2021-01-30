# Express

express是nodejs最常用的web框架

## 下载、安装、使用、中间件机制

- 安装（使用脚手架express-generator）
  - 全局安装
  
    npm install express-generator -g  或 
  
    npm --registry https://registry.npm.taobao.org install express-generator -g
  
  - 生成项目  express blog-express
  
  - npm install
  
  - npm start
  
  - 安装辅助工具  npm i **nodemon** **cross-env** --save-dev --registry https://registry.npm.taobao.org
  
    - "dev" : "cross-env NODE_ENV=dev nodemon ./bin/www
    - ↑package.json添加辅助



## 插件

主要看app.js

## 处理路由

1.创建路由处理文件blog.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.json({
    errno: 0,
    data: [1,2,3]
  })
});

module.exports = router;
```

2.app.js

- const bolgRouter **=** require('./routes/blog');  引入js
- app**.**use('/api/blog', bolgRouter);  给express实例绑定

## 中间件机制

- app.use()注册函数时，若无路由限制app.use(‘/api/xxx’，fuc)，都会执行

- (req,res,next)中的next会执行下一个符合条件的js
- 若不执行next(),不会自动执行下一个符合条件的处理块

- 中间件其实就是app.xxx()【xxx:use,get,post】里注册的函数

## express开发博客

### 安装插件

```javascript
npm --registry https://registry.npm.taobao.org install mysql xss --save
```

### 实现登录

- 使用express-session处理session

  ```javascript
  npm --registry https://registry.npm.taobao.org install express-session --save
  ```

  - 引用：

  ```javascript
  const session = require('express-session');
  
  ...
  
  // 解析cookie之前，先解析session
  app.use(session({
    secret: 'WJiol_#2345_',//随便设，加密
    cookie: {
      path: '/', //默认配置
      httpOnly: true, //默认配置
      maxAge: 24 * 60 * 1000,
    }
  }))
  ```

- 使用connect-redis

  安装插件（redis,connect-redis)

  ```javascript
  npm --registry https://registry.npm.taobao.org install redis connect-redis --save
  ```

  - 引用

  ```javascript
  const RedisStore = require('connect-redis')(session)
  
  //redisClient是已经连接到redis数据库的封装好的redis服务端
  const redisClient = require('./db/redis')
  const sessionStore = new RedisStore({
    client: redisClient
  })
  
  //在express-session处理代码块中加入连接：store: sessionStore //关联到redis
  app.use(session({
    secret: 'WJiol_#2345_',
    cookie: {
      path: '/', //默认配置
      httpOnly: true, //默认配置
      maxAge: 24 * 60 * 1000,
    },
    store: sessionStore //关联到redis
  }))
  ```

- req.session保存登录信息，登录校验做成**express中间件**

  ```javascript
  module.exports = (req, res, next) => {
    if(req,session,username) {
      next()
      return
    }
  
    res.json(
      new ErrorModel('未登录')
    )
  }
  ```

  - 每次调用接口时，加入登录验证的中间件就可以了

  ```javascript
  router.post('/api', loginCheck, (req, res, next) => {
    xxx
  })
  ```

  

## morgan记录日志

- access log 记录，直接使用morgan
- 自定义日志使用console.log和console.error即可
- 日志文件拆分，日志内容分析
- 日志格式
  - https://github.com/expressjs/morgan
  - Predefined Formats
  - 格式：dev...

## express中间件原理

- app.listen
- app.use
- app.get
- app.post

app.use用来注册中间件，先收集起来

遇到http请求，根据path和method判断触发

实现next机制，即上一个通过next触发下一个