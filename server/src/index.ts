import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }, // 👈 match your frontend origin
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send_msg', (msg) => {
    console.log('Message from client:', msg);
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
