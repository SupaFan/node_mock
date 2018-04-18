## 守财鹿 express搭建的模拟数据

* 本地nodejs启动

* 配置请求代理

  ```
    proxyTable: {
      '/weixin': {
        target: 'http://localhost:107',
        changeOrigin: true,
        pathRewrite: {'^/weixin': '/weixin'}
      }
    },
  ```
  
### mock server 配置

> 基于Nodejs express 搭建服务器 拦截所有请求返回指定的json串

```
const express = require('express')
const mockServer = express()
const Mock = require('./mock.js')
// 使用中间件拦截所有请求
mockServer.use('/*', (req, res, next) => {
  const JsonPath =req.params[0].replace(/\//g,'.')
  res.json(eval(`Mock.${JsonPath}`))
})
// server
const server = mockServer.listen(107, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("running in", host, port)
})
````

### 服务器代理配置

> 本地开发本地服务器代理配置 nginx 配置 || Vue 配置
  1. vue 配置
`path:  /config/index.js `
```
proxyTable: {
  '/api': {
    target: 'http://localhost:107',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
    }}}
```

  2. nginx 配置服务器代理（当你没使用vue的时候 可以配置nginx代理进行常规开发）
```
server {
      ...
      location /api/ {
        proxy_pass localhost:107/api/;
    }
}
```

### Mockjs 配置

> 随机生成各种数据

```
const Mock = require('mockjs')
const Random = Mock.Random

const apiList = {
  api: {
    list: Mock.mock({
      'list|1-10': [{
        'id|+1': 1,
        title: Random.title(3, 5),
        time: Random.date()
      }]
    }),
    user: Mock.mock({
      name: Random.name(),
      email: Random.email(),
      address: Random.county(),
    }),
    a: {
      b: {
        'number1|1-100.1-10': 1,
        'number2|123.1-10': 1,
        'number3|123.3': 1,
        'number4|123.10': 1.123
      }
    }
  }
}
module.exports = apiList
```

### 启动server服务
> pm2 启动server 或者直接用node启动

`pm2-dev mock-server.js // 调试模式启动`
`pm2 start mock-server.js // 后台运行 `
`node  mock-server.js` 
### 最终效果
![image.png](http://upload-images.jianshu.io/upload_images/1771496-e87d593a8cde47cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






