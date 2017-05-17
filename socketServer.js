// #!/usr/bin/env node
import http from 'http'
import express from 'express'
import socketIo from 'socket.io'

let app = express()
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
/**
 * Create HTTP server.
 */
let server = http.createServer(app);

let io = socketIo(server);
var onlineUsers = {};
var onlineCount = 0;

io.on('connection', (socket) => {
  console.log('a user connection');

  //监听用户发布聊天内容
  socket.on('message', function (obj) {
    //向所有客户端广播发布的消息
    io.emit('message', obj);
    console.log(obj.username + '说：' + obj.content);
  });

  /**
   * 间隔时间向客户端发出消息
   * @type {number}
   */
  var pushCarDataTimer = setInterval(function () {
    // 向客户端发送数据
    io.emit('pushCarData', {
      speed: (Math.random() * 100).toFixed(2) - 0,
      rpm: (Math.random() * 7).toFixed(2) - 0,
      oil: (Math.random() * 2).toFixed(2) - 0,
      water: (Math.random() * 2).toFixed(2) - 0
    });
  }, 2500);
  socket.on('disconnect', function () {
    clearInterval(pushCarDataTimer);
    console.log('disconnect end');
  });
});

server.listen(port, function () {
  console.log('listening on *:%s', port);
});


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}