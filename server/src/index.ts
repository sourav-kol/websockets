import { expressServer, app } from './express-server';
import { io } from './web-socket';
import { sendMessage } from './web-socket/events';
import { websocketEvents } from './helpers/constants';

io.on(websocketEvents.CONNECT, (socket) => {
  console.log('Client connected:', socket.id);

  // socket.disconnect();
  // console.log('Client disconnecting:', socket.id);
  // socket.on(websocketEvents.DISCONNECT, () => {
  //   console.log('Client disconnected:', socket.id);
  // });

  sendMessage(socket);
});

// app.get('/api/test', (req, res) => { res.send('working') });

// app.get('/api/create-room', (req, res) => { 

// })

//todo:
//clicks on create room
//api call -> create uuid -> create socket room -> join socket room
//store id in list 
//display list of rooms
//clicks on room -> join room -> join socket room


expressServer();
