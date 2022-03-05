const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { randomInt } = require('crypto');

const app = express();
const server = http.createServer(app);
const PORT = 3000 || process.env.PORT;
const io = socketio(server);

// Seteando carpeta estatica, carpeta donde contiene todos los datos que requiere el usuario cuando hace la peticion
// a la web buscando recursos.
app.use(express.static(path.join(__dirname, 'public')))
console.log("Empezando!!");

// NOTA
// io.emit() broadcast
// socket.emit() unicast
// socket.broadcast.emit() broadcast excepto to the sender

// Funcion que se ejecuta cuando un usuario se conecta al websocket
io.on('connection', (socket) => {
    console.log("Nueva conexion!!");
    
    // Envia mensaje cuando cliente se desconecta
    socket.on('disconnect', () => {
        console.log("Disconect");
        io.emit('server', 'Alguien se ha desconectado!!!');
    });

    socket.on('client', (input) => {
        console.log('recieved');
        socket.emit('server', input);
    })
})

server.listen(PORT, () => {console.log(`runing on port ${PORT}`);});