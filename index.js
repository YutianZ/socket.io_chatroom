const express = require('express');
const socket = require('socket.io');

//app set up
const app = express();

//server listening to port 4396
const server = app.listen(4396, () => {
    console.log("Listening to port 4396");
})

//static files
app.use(express.static('public'));

//socket.io set up
const io = socket(server);

//wait for event connection
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
});
