import dotenv from 'dotenv';

import { app, expressServer } from './express-server';
import { io } from './web-socket';
import { joinRoom, recieveMessageByRoom } from './web-socket/events';
import { websocketEvents } from './helpers/constants';
import { userController } from './controller/userController';
import { groupController } from './controller/groupController';
import { memberController } from './controller/groupMemberController';
import { documentController } from './controller/documentController';

dotenv.config();

io.on(websocketEvents.CONNECT, (socket) => {
  console.log('Client connected:', socket.id);

  // socket.disconnect();
  // console.log('Client disconnecting:', socket.id);
  // socket.on(websocketEvents.DISCONNECT, () => {
  //   console.log('Client disconnected:', socket.id);
  // });

//  joinRoom(socket);
  //recieveMessageByRoom(socket);
});

app.use('/group', groupController);
app.use('/user', userController);
app.use('/group-member', memberController);
app.use('/document', documentController);

expressServer();
