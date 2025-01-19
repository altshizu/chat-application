import express from 'express';
import { createServer } from 'http';
import { Socket } from 'socket.io';

const app = express();
const server = createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket: Socket) => {
    console.log('Client connected');

    socket.on('message', (msg: string) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
