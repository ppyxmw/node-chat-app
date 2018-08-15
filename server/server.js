const path = require("path"); // node module that simplifies paths
const express = require("express");

const publicPath = path.join(__dirname, "../public"); 
// a simplified path is created.
const port = process.env.PORT || 8080;

var app = express(); 
// app to config our express app. Remember we config express 
// by calling methods on app (create routes, add middleware or start server).
// instead of passing args to express

app.use(express.static(publicPath)); // serves up the public folder

app.listen(port, () => { 
    console.log(`server is up on port ${port}`); 
    //starts up the server, getting port from line 6
    // callback is just to print something for us in terminal
});