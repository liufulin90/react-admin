/*引入express*/
var express = require('express');
var port = 8003;
var path = require('path');

/*实例化express*/
var app = express();
// app.use(express.static(path.join(__dirname, 'dist')));
process.env.NODE_ENV = 'production';
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
  Object.assign(mock, require('./mock/' + file))
})
for (let key in mock) {
  let func = key.split(' ')[1]
  let method = key.split(' ')[0]
  /*设置监听端口,同时设置回调函数，监听到事件时执行回调函数*/
  if (method == 'GET') {
    app.get(func, mock[key]);
  } else if (method == 'POST') {
    app.post(func, mock[key]);
  }
}

require('./src/utils/mock.js')

app.listen(port, function afterListen () {
  console.log('---------------------------------------')
  console.log('express running on the http://localhost:%s', port);
});