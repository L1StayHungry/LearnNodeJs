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

module.exports = {
  getList
}