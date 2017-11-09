/**/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5002;

var verbose = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('data', function(msg){
    	io.emit('message', msg);
	if (verbose == true)
		console.log("message: " + msg);
  });
});



var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);

  socket.on('data', function(msg){
    io.emit('message', msg.toString());
	if (verbose == true)
	        console.log("Socket message: " + msg);
  });
});

var socketPort = 5001;
server.listen(socketPort, '127.0.0.1');

http.listen(port, function(){
  console.log('Socket server listening on *:' + socketPort + '. Web pagelistening on *:' + port);
});

