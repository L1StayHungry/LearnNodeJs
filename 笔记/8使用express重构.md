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