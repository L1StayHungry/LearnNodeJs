const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err => {
	console.error(err)
})


// 提供set及get接口以供调用
function set(key, val) {
  // 转换成字符串形式
  if(typeof val === 'object') {
    val = JSON.stringify(val)
    /**
     * redis的set方法的key和value都要是字符串形式
     * 如果不进行转换，会调用默认的val.toString()，可能与预期不符
     * 如：
     * let obj = {a: '333'}
       Object.prototype.toString.call(obj)  // "[object Object]"
     */
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  return new Promise((resolve,reject) => {
    redisClient.get(key, (err,val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      // 兼容JSON
      // 因为前面将对象存储到redis时将其转换成了JSON字符串形式，
      // 所以先尝试将获取到的值进行JSON解析
      // 如果不成功，说明不是对象，直接catch里resolve就好
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}