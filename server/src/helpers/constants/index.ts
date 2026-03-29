const websocketEvents = {
    CONNECT: 'connection',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    ERROR: 'error',
    RECONNECT: 'reconnect',
    JOINROOM: 'join_room',
    CLIENTMSG: 'client_msg',
    SERVERMSG: 'server_msg',
    ROOMMESSAGE: 'room_message',
    SYNCINIT: "sync_init",
    SYNC: "sync",
    SYNCOMPLETE: "sync_complete"
}
export { websocketEvents };
