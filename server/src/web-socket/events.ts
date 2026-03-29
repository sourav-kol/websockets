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
        console.log("cache: ", serverStore.cache);

        //new join room request
        //check the cache store - roomId -> get the last doc updater
        //sync -> 
        //take session id from cache and make a websocket call to tht client
        //client will listen to this event and reply with the automerger snapshot
        //joining client will have another websocket listener to get the synced doc and init its automerger instance

        socket.join(roomId);
        console.log('joined ', socket.id, 'room ID:', roomId);

        docSyncInit(socket, roomId, socket.id);
    });
}

const docSyncInit = (socket: Socket, currentRoomId: string, sessionId: string) => {
    var lastUpdatedBy = serverStore.cache.get(currentRoomId);
    if (lastUpdatedBy) {
        socket.to(lastUpdatedBy.socketId).emit(websocketEvents.SYNCINIT, {
            socketId: sessionId
        })
    }
}

const docSync = (socket: Socket) => {
    socket.on(websocketEvents.SYNC, (request: any) => {
        console.log("sying", request)
        socket.to(request.socketId).emit(websocketEvents.SYNCOMPLETE, {
            snapShot: request.snapShot
        });
    })
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

export { recieveMessage, joinRoom, recieveMessageByRoom, docSync };
