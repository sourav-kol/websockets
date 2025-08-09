export type joinRoomRequest = {
    roomId: string;
}

export type clientMessageRequest = {
    roomId: string, //to
    message: string,
    sender: string
}

//--
export type change = {
    text: string,
    insertAt: number,
    deleteAt: number
}


export type clientEditorMessageRequest = {
    roomId: string, //to
    message: change,
    sender: string
}

export type changeData = {
    op: string,
    from?: number, 
    to?: number,
    text: string 
}

export type storageType = 'localStorage'; //'session' | 'local';

export type chatGroup = {
    name: string
    id: string
}

export type User = {
    name: string;
    email: string;
    password: string;    
}

export type Group = {
    name: string;
    createdById:string;
}