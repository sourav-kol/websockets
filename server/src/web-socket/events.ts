import { Socket } from "socket.io";
import { serverStore } from "../cache";
import { websocketEvents } from ".././helpers/constants";
import { joinRoomRequest, clientMessageRequest, CacheValue } from ".././types";

const recieveMessage = (socket: Socket) => {
    socket.on(websocketEvents.CLIENTMSG, (msg: string) => {
        console.log('Message from client:', msg);
    });
}

///join the room
const joinRoom = (socket: Socket) => {
    
    socket.on(websocketEvents.JOINROOM, (request: joinRoomRequest) => {
        var { roomId } = request;
        console.log("cache: ",serverStore.cache);
        socket.join(roomId);
        console.log('joined ', socket.id, 'room ID:', roomId);
    });
}

///recieve the message sent from the client room-wise.
const recieveMessageByRoom = (socket: Socket) => {
    socket.on(websocketEvents.CLIENTMSG, (request: clientMessageRequest) => {
        // console.log('Message from client:', request);
        // console.log('sending to:', request.roomId);

        var value: CacheValue = {
            socketId: socket.id,
            timeStamp: new Date()
        }

        serverStore.set(request.roomId, value);
        
        socket.to(request.roomId).emit(websocketEvents.SERVERMSG, request);
    });
}

// const sendMessageByRoom = (socket: Socket, roomId: string) => {
//     socket.on(websocketEvents.SERVERMSG, (request: clientMessageRequest) => {
//         console.log('Message to client:', request);
//     });
// }

export { recieveMessage, joinRoom, recieveMessageByRoom };
