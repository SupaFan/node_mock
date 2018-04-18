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