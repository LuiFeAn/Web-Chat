const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io")

const App = express();
const server = http.createServer(App);
const io = socket(server);

server.listen(3000);

App.use(express.static(path.join(__dirname,'View')));
App.use
let users = [];
io.on("connection",(socket)=>{
    console.log("Usuário(a) conectado");
    socket.on('join-request', (user)=>{
        socket.user = user;
        users.push(user);
        console.log(`Bem-vindo(a) ${user}`);
        socket.emit('login-user',users);
        socket.broadcast.emit('list-update',{
            joined: user,
            list: users,
        })
    });
    socket.on("send-msg",(data)=>{
        let obj = {
            user: socket.user,
            msg: data,
        }
        socket.emit("show-msg",obj);
        socket.broadcast.emit("show-msg",obj);
    })
})