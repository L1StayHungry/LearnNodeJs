const getList = (author,keyword) => {
  //先返回假数据，保证格式正确
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容A',
      createTime: 1605080082985,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容B',
      createTime: 1605080127322,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题1',
    content: '内容A',
    createTime: 1605080082985,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content 属性
  // console.log('newBlog blogData',blogData);
  
  return {
    id: 3 //表示新建博客， 插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // blogData是一个博客对象，包含title content 属性
  // console.log('updateBlog id,blogData',id,blogData);

  return true
  //返回true表示更新成功
}

const delBlog = (id) => {
  // 播客id
  console.log(id);
  

  return true
  //返回true表示更新成功
}

module.exports = {
  getList,
  getDetail,
  newBlog, 
  updateBlog,
  delBlog
}