export type joinRoomRequest = {
    roomId: string;
}

export type clientMessageRequest = {
    roomId: string, //to
    message: string,
    sender: string
}

export type change = {
    text: string,
    insertAt: number,
    deleteAt: number
}