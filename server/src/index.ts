import { expressServer } from './express-server';
import { io } from './web-socket';
import { sendMessage } from './web-socket/events';
import { websocketEvents } from './helpers/constants';

io.on(websocketEvents.CONNECT, (socket) => {
  console.log('Client connected:', socket.id);

  sendMessage(socket);
});

expressServer();
