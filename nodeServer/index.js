//Node Server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

let users = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("new-user-joined", (Name) => {
    if(Name){
      console.log("Received new-user-joined event with name:", Name);
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
