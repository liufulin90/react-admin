import Mock from 'mockjs'

var timeVale = parseInt(new Date().getTime()/1000 - 10*100)
var testData = Mock.mock({
  "data|100": [
    {
      temperature: "@float(0, 100, 1, 2)",
      "number|+10": timeVale
    }
  ]
})

export default {
  testData
}