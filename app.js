var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];

app.get('/', function(req, res) {
  res.send('hey').end();
})

/** Handle socket events **/

// when a user connects
io.on('connection', function (socket) {
  // emit to everyone, but the person who sent it.
  socket.broadcast.emit('user connected');
  socket.broadcast.to(socket.id).emit('user list', players);
  console.log('user connected', socket.id);

  socket.on('user spawned', function (data) {
    players.push(data);
    socket.broadcast.emit('user spawned', data);
  });

  // handler for new message.
  // when a client sends a 'message' packet to the server.
  socket.on('user message', function (data) {
    io.emit('user message', data);
    console.log('user message', data);
  });

  // handler for disconnect
  // this will run when a user closes the stream.
  socket.on('user disconnected', function (data) {
    // tell everyone who disconnected.
    io.emit('user disconnected', data);
    console.log('user disconnected');
  });

  // handler for movement
  // this will run when a user moves
  socket.on('user movement', function (data) {
    // tell everyone who moved.
    socket.broadcast.emit('user movement', data);
    console.log('user movement', data);
  });
  // handler for shooting weapon.
  // this will run when a user shoots his gun.
  socket.on('user fired', function (data) {
    // tell everyone who shot and in which direction.
    socket.broadcast.emit('user fired', data);
    console.log('user fired');
  });

  // handler for jumping.
  // this will run when a user jumps.
  socket.on('user jumped', function (data) {
    // tell everyone who jumped.
    socket.broadcast.emit('user jumped', data);
    console.log('user jumped');
  });
  // handler for dying.
  // this will run when a user dies.
  socket.on('user died', function (data) {
    // tell everyone who died.
    socket.broadcast.emit('user died', data);
    console.log('user died');
  });

  // handler for respawn
  // this will run when a user respawns.
  socket.on('user respawned', function (data) {
    // tell everyone who respawned.
    socket.broadcast.emit('user respawned', data);
    console.log('user respawned');
  });

});

http.listen(8080, function () {
  console.log('server is started');
});
