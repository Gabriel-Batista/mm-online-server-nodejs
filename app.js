var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('hey').end();
})

/** Handle socket events **/

// when a user connects
io.on('connection', function (socket) {
  // emit to everyone, but the person who sent it.
  socket.broadcast.emit('user connected');
  console.log('user connected');

  // handler for new message.
  // when a client sends a 'message' packet to the server.
  socket.on('user message', function (data) {
    io.emit('user message', data);
    console.log('user message', data);
  });

  // handler for disconnect
  // this will run when a user closes the stream.
  socket.on('disconnect', function () {
    // tell everyone who disconnected.
    io.emit('user disconnected', {});
    console.log('user disconnected');
  });

});

http.listen(8080, function () {
  console.log('server is started');
});
