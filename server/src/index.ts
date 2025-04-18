import { expressServer } from './express-server';
import { io } from './web-socket';


io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send_msg', (msg) => {
    console.log('Message from client:', msg);
  });
});

expressServer();
