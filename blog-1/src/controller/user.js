const loginCheck = (username, password) => {
  // 使用假数据
  if (username === 'admin' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  loginCheck
}