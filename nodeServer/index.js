//Node Server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
let ejs = require('ejs');
// app.set('view engine','ejs');

//built in midddleware
app.use(express.static(path.join(__dirname,'../public')));

app.get("/", (req, res) => {
  
});

let users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (Name) => {
    if(Name){
      users[socket.id] = Name;
      socket.broadcast.emit("user-joined", Name);
    }
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left",
       users[socket.id]
    );
    delete users[socket.id];
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
