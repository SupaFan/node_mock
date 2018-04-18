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