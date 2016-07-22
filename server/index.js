// Requires
const express = require('express');
const socket = require('socket.io');
const http = require('http');

// Init
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

// Config
const EXPRESS_PORT = 3000;

// Routes
app.use(express.static(`${__dirname}/../client`));


// Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
  });
});


server.listen(process.env.PORT || EXPRESS_PORT);
console.log(`Listening on port ${EXPRESS_PORT}`);
