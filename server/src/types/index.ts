export type joinRoomRequest = {
    roomId: string;
}

export type clientMessageRequest = {
    roomId: string, //to
    message: any, //change
    sender: string
}

export type User = {
    name: string;
    email: string;
    password: string;    
}

export type Group = {
    name: string;
    createedById: string;
}

export type GroupMember = {
    userId: string;
    groupId: string;
}

export type Document = {
    content: string;
    groupId: string;
}