import { Socket } from "socket.io";
import { serverStore } from "../cache";
import { websocketEvents } from ".././helpers/constants";
import { joinRoomRequest, clientMessageRequest, CacheValue } from ".././types";

// const recieveMessage = (socket: Socket) => {
//     socket.on(websocketEvents.CLIENTMSG, (msg: string) => {
//         console.log('Message from client:', msg);
//     });
// }

///join the room
const joinRoom = (socket: Socket) => {

    socket.on(websocketEvents.JOINROOM, (request: joinRoomRequest) => {
        var { roomId, userId } = request;

        //new join room request
        //check the cache store - roomId -> get the last doc updater
        //sync -> 
        //take session id from cache and make a websocket call to tht client
        //client will listen to this event and reply with the automerger snapshot
        //joining client will have another websocket listener to get the synced doc and init its automerger instance

        socket.join(roomId);
        console.log('joined ', socket.id, 'room ID:', roomId, "userId: ", userId);

        docSyncInit(socket, roomId, userId);
    });
}

const docSyncInit = (socket: Socket, currentRoomId: string, userId: string) => {
    var lastUpdatedBy = serverStore.get(currentRoomId, userId);
    if (lastUpdatedBy) {
        socket.to(currentRoomId).emit(`${websocketEvents.SYNCINIT}/${lastUpdatedBy.userId}`, {
            userId: userId
        })
    } else {
        var value: CacheValue = {
            // socketId: socket.id,
            timeStamp: new Date(),
            userId: userId
        }

        serverStore.set(currentRoomId, userId, value);
    }
}

const docSync = (socket: Socket) => {
    socket.on(websocketEvents.SYNC, (request: any) => {
        socket.to(request.roomId).emit(`${websocketEvents.SYNCOMPLETE}/${request.userId}`, {
            snapShot: request.snapShot
        });
    })
}

///recieve the message sent from the client room-wise.
const recieveMessageByRoom = (socket: Socket) => {
    socket.on(websocketEvents.CLIENTMSG, (request: clientMessageRequest) => {
        var value: CacheValue = {
            // socketId: socket.id,
            userId: request.userId,
            timeStamp: new Date()
        }

        serverStore.set(request.roomId, request.userId, value);

        socket.to(request.roomId).emit(websocketEvents.SERVERMSG, request);
    });
}

export { joinRoom, recieveMessageByRoom, docSync };
