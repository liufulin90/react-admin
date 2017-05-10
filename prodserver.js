/*引入express*/
var express = require('express');
var port = 8002;
var path = require('path');

var runPath = __dirname + '/dist'
/*实例化express*/
var app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, function afterListen () {
  console.log('---------------------------------------')
  console.log('express server root path:%s', runPath);
  console.log('express running on the http://localhost:%s', port);
});