const path = require("path"); 
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "../public"); 
const port = process.env.PORT || 8080;
var app = express(); 
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); 

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
      // return ensures none of the code below runs if data is not valid
    }
    
    socket.join(params.room);
    users.removeUser(socket.id); //removes user from any other rooms they are in
    users.addUser(socket.id, params.name, params.room); //adds user to list
    
    io.to(params.room).emit('updateUserList', users.getUserlist(params.room), params.room); 
    //emits names in room to the new room joiner
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',  generateMessage('Admin', `${params.name} has joined.`));
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New user joined'));
    callback();
  });
  
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage',  generateMessage(user.name, message.text));
      callback();
    }
  });
  
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    
    if(user) {
      io.to(user.room).emit('newLocationMessage',  generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });
  
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    // remember this returns the user removed
    // so if a user was removed then we update list and inform room
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserlist(user.room), user.room);
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => { 
    console.log(`server is up on port ${port}`); 
});