"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        socket.broadcast.emit('message', msg);
        console.log('Broadcasted message to others');
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
