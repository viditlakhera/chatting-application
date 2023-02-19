// const socket = io('http://localhost:2000');


// import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io();

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});

const messageInput = document.getElementById('messageInp')
const form = document.getElementById('send-container')
const messageContainer = document.querySelector('.container')


const nam = prompt('Enter your name to join')
console.log(nam);
socket.emit('new-user-joined',nam);