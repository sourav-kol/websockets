import { Server } from 'socket.io';
import { expressServer, httpServer } from './express-server';

const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:3000' },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send_msg', (msg) => {
    console.log('Message from client:', msg);
  });
});

expressServer();
