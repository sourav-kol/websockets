import { Server } from "socket.io";
import { httpServer } from '../express-server';

//@ts-ignore
const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:3000' },
});

export { io };
