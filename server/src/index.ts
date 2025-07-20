import dotenv from 'dotenv';

import { expressServer, app } from './express-server';
import { io } from './web-socket';
import { joinRoom, recieveMessageByRoom } from './web-socket/events';
import { websocketEvents } from './helpers/constants';
import { dbClientInit } from './db-connect';


dotenv.config();

io.on(websocketEvents.CONNECT, (socket) => {
  console.log('Client connected:', socket.id);

  // socket.disconnect();
  // console.log('Client disconnecting:', socket.id);
  // socket.on(websocketEvents.DISCONNECT, () => {
  //   console.log('Client disconnected:', socket.id);
  // });

  joinRoom(socket);
  recieveMessageByRoom(socket);
});

dbClientInit()
// console.log(sql`
//     select *
//     from test
//   `);
expressServer();
