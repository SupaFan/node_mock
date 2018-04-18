## 守财鹿 express搭建的模拟数据

* 本地nodejs启动

* 配置请求代理


  
### mock server 配置

> 基于Nodejs express 搭建服务器 拦截所有请求返回指定的json串

```
const express = require('express')
const mockServer = express()
const data = require('./data/scdeer')
// 使用中间件拦截所有请求
mockServer.use('/*', (req, res, next) => {
  const JsonPath = req.params[0].replace(/\//g,'.')
  res.json(eval(`data.${JsonPath}`))
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
      '/weixin': {
        target: 'http://localhost:107',
        changeOrigin: true,
        pathRewrite: {'^/weixin': '/weixin'}
      }
    },
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
  weixin: {
    order: {
      // 还款记录列表
      queryRepayOrderList: {
        json: Mock.mock({
          "data|10": [{
            "delayDay|1": [0, 24],
            "message|1": ["还款成功","还款处理中","还款失败"],
            "orderNo": /\d{8}/,
            "repaymentAmount|0-9999.2":200,
            "tradeNo": /(yjf)\d{8}/,
            "debitCardBankNo":/\d{4}/,
            "creditCardBankNo":/\d{4}/,
            "debitCardBankName":'招商银行',
            "creditCardBankName":'中信银行',
            "debitCardBankCode":'CMB',
            "creditCardBankCode":'ABC',
            "userId|+1": 1,
            "yjfUsreId|+1": 11,
            "rawAddTime": Random.date() +" "+ Random.time(),
            "rawUpdateTime": Random.date() +" "+ Random.time()
          }],
          "attributes": {
            "count|10-30": 0,
            "page|+1": 1
          },
          "message": "操作成功",
          "success": true
        })
      },
      // 还款记录详情
      queryRepayOrder: {
        json: (() => {
          return Mock.mock({
            "data":{
              "delayDay|1": [0, 24],
              "message|1": ["还款成功","还款处理中","还款失败"],
              "orderNo": /\d{8}/,
              "repaymentAmount|0-9999.2":200,
              "tradeNo": /(yjf)\d{8}/,
              "debitCardBankNo":/\d{4}/,
              "creditCardBankNo":/\d{4}/,
              "debitCardBankName":'招商银行',
              "creditCardBankName":'中信银行',
              "debitCardBankCode":'CMB',
              "creditCardBankCode":'ABC',
              "userId|+1": 1,
              "yjfUsreId|+1": 11,
              "rawAddTime": Random.date() +" "+ Random.time(),
              "rawUpdateTime": Random.date() +" "+ Random.time()
            },
            "message": "操作成功",
            "success": true
          })
        })()
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






