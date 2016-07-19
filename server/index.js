var express = require('express');
var app = express();
// http://stackoverflow.com/questions/10231688/node-js-socket-io-vs-express-static
var http = require('http');
var server = http.createServer(app);
var path = require('path');
var io = require('socket.io').listen(server);


app.use(express.static(__dirname + "/../client-mockup"))

// app.get('/', function(req, res) {
// })

// app.get('/', function(req, res) {
// 	res.sendFile(path.resolve(__dirname + "/../client-mockup/index.html"));
// });

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg) {
		console.log(msg);
		socket.broadcast.emit('chat message', msg);
	});
});


var port = 5002
server.listen(process.env.PORT || port); //, function() {
console.log('Listening on port 3000');
// });