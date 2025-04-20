import { Socket } from "socket.io";
import { websocketEvents } from ".././helpers/constants";
import { joinRoomRequest, clientMessageRequest } from ".././types";

const recieveMessage = (socket: Socket) => {
    socket.on(websocketEvents.CLIENTMSG, (msg: string) => {
        console.log('Message from client:', msg);
    });
}

const joinRoom = (socket: Socket) => {
    socket.on(websocketEvents.JOINROOM, (request: joinRoomRequest) => {
        var { roomId } = request;
        socket.join(roomId);
        console.log('joined ', socket.id, 'room ID:', roomId);
    });
}

const recieveMessageByRoom = (socket: Socket) => {
    socket.on(websocketEvents.CLIENTMSG, (request: clientMessageRequest) => {
        console.log('Message from client:', request);
        console.log('sending to:', request.roomId);
        socket.to(request.roomId).emit(websocketEvents.SERVERMSG, request);
    });
}

// const sendMessageByRoom = (socket: Socket, roomId: string) => {
//     socket.on(websocketEvents.SERVERMSG, (request: clientMessageRequest) => {
//         console.log('Message to client:', request);
//     });
// }

export { recieveMessage, joinRoom, recieveMessageByRoom };
