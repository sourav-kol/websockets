import { expressServer, app } from './express-server';
import { io } from './web-socket';
import { recieveMessage, joinRoom, recieveMessageByRoom } from './web-socket/events';
import { websocketEvents } from './helpers/constants';

io.on(websocketEvents.CONNECT, (socket) => {
  console.log('Client connected:', socket.id);

  // socket.disconnect();
  // console.log('Client disconnecting:', socket.id);
  // socket.on(websocketEvents.DISCONNECT, () => {
  //   console.log('Client disconnected:', socket.id);
  // });

  //recieveMessage(socket);
  joinRoom(socket);
  recieveMessageByRoom(socket);
});

// app.get('/api/test', (req, res) => { res.send('working') });

// app.get('/api/create-room', (req, res) => { 

// })


expressServer();
