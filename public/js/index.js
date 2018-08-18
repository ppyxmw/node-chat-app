var socket = io();
      
socket.on('connect', function () {
  console.log('Connected to server');
  
  socket.emit('createMessage', {
    from: "Dusty Sparrow",
    text: "Hi Mike, what is going on?",
    createdAt: 1234
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('new message:', message);
});