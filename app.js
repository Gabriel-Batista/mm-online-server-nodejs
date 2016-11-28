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
  socket.on('user disconnect', function () {
    // tell everyone who disconnected.
    io.emit('user disconnected', {});
    console.log('user disconnected');
  });

});

// handler for movement
// this will run when a user moves
socket.on('user movement', function () {
  // tell everyone who moved.
  io.emit('user moved', {});
  console.log('user moved');
});

});
// handler for shooting weapon.
// this will run when a user shoots his gun.
socket.on('user fired', function () {
  // tell everyone who shot and in which direction.
  io.emit('user fired', {});
  console.log('user fired');
});

});
// handler for jumping.
// this will run when a user jumps.
socket.on('user jumped', function () {
  // tell everyone who jumped.
  io.emit('user jumped', {});
  console.log('user jumped');
});

});
// handler for dying.
// this will run when a user dies.
socket.on('user died', function () {
  // tell everyone who died.
  io.emit('user died', {});
  console.log('user died');
});

});

// handler for respawn
// this will run when a user respawns.
socket.on('user respawned', function () {
  // tell everyone who respawned.
  io.emit('user respawned', {});
  console.log('user respawned');
});

});

http.listen(8080, function () {
  console.log('server is started');
});
