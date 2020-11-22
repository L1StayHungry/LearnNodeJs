//获取/生成cookie的过期时间
const getCookieExpries = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 *1000))
  // console.log(d.toGMTString());
  // Sun, 22 Nov 2020 08:55:34 GMT
  //一种日期格式
  return d.toGMTString()
}

module.exports = { getCookieExpries }