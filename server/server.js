const path = require("path"); // node module that simplifies paths
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public"); 
// a simplified path is created.
const port = process.env.PORT || 8080;

var app = express(); 
// app to config our express app. Remember we config express 
// by calling methods on app (create routes, add middleware or start server).
// instead of passing args to express
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); // serves up the public folder

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => { 
    console.log(`server is up on port ${port}`); 
});
//starts up the server, getting port from line 6
// callback is just to print something for us in terminal