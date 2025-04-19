import { Server, Socket } from "socket.io";

const sendMessage = (socket: Socket) => {
    socket.on('send_msg', (msg: string) => {
        console.log('Message from client:', msg);
    });
}

const joinRoom = (socket: Socket, roomId: string) => {
    socket.join(roomId)
}

export { sendMessage };
