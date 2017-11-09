var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5002;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("ok1: ");
  socket.on('data', function(msg){
	console.log("ok2:");
    io.emit('message', msg);
	console.log("mssage" + msg);
  });
});



var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);

  socket.on('data', function(msg){
        console.log("ok2:");
    io.emit('message', msg.toString());
        console.log("mssage" + msg);
  });
});

server.listen(5001, '127.0.0.1');

http.listen(port, function(){
  console.log('listening on *:' + port);
});

