* 守财鹿 express搭建的模拟数据

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
