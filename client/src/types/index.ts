export type joinRoomRequest = {
    roomId: string;
}

export type clientMessageRequest = {
    roomId: string, //to
    message: string,
    sender: string
}