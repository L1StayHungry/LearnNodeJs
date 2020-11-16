//先导入mysql.js封装好的exec函数
const { exec } = require('../db/mysql')

const getList = (author,keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    //后面记得加空格，方便下一个句子加入
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  
  //返回promise
  return exec(sql)
  //先返回假数据，保证格式正确
  // return [
  //   {
  //     id: 1,
  //     title: '标题1',
  //     content: '内容A',
  //     createTime: 1605080082985,
  //     author: 'zhangsan'
  //   },
  //   {
  //     id: 2,
  //     title: '标题2',
  //     content: '内容B',
  //     createTime: 1605080127322,
  //     author: 'lisi'
  //   }
  // ]
}

const getDetail = (id) => {
  // 先返回假数据
  // return {
  //   id: 1,
  //   title: '标题1',
  //   content: '内容A',
  //   createTime: 1605080082985,
  //   author: 'zhangsan'
  // }
  const sql = `select * from blogs where id='${id}' `
  return exec(sql).then(rows => {
    // 把外层数组先去掉
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content 属性
  const title = blogData.title
  const content = blogData.content
  const createtime = Date.now()
  const author = blogData.author
  // console.log('newBlog blogData',blogData);

  const sql = `
    insert into blogs (title,content,createtime,author) 
    values ('${title}','${content}','${createtime}','${author}');
  `
  return exec(sql).then(insertData => {
    console.log(insertData);
    return {
      id: insertData.insertId
    }
  })

  // return {
  //   id: 3 //表示新建博客， 插入到数据表里面的id
  // }
}

const updateBlog = (id, blogData = {}) => {
  // blogData是一个博客对象，包含title content 属性
  const title = blogData.title
  const content = blogData.content
  // console.log('updateBlog id,blogData',id,blogData);
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id};
  `
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0){
      return true
    }
    return false
  })
  // return true
  //返回true表示更新成功
}

const delBlog = (id,author) => {
  // 播客id
  const sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(deleteData => {
    if(deleteData.affectedRows > 0){
      return true
    }
    return false
  })
  // return true
  //返回true表示更新成功
}

module.exports = {
  getList,
  getDetail,
  newBlog, 
  updateBlog,
  delBlog
}