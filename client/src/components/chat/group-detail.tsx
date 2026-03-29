'use client';

import { useEffect, useState } from 'react';

import { joinRoomRequest, clientEditorMessageRequest, GroupResponse } from '@/types';
import { useSocket } from '@/context/socket-provider';
import Editor from '@/components/editor/text-area';
import { socketMessageEvent } from '@/constants/constants';
import { next as Automerge } from "@automerge/automerge";
import { generateSnaphot, syncFromSnapshot } from '@/helper/automerger/automergerHelper';

type Prop = {
    chatData: GroupResponse,
    sender: string
}

export default function ChatGroupDetail(props: Prop) {
    const { chatData, sender } = props;
    const socket = useSocket();
    const [serverMessage, setServerMessage] = useState<Automerge.Change[]>();
    const [isSynced, setIsSynced] = useState<boolean>(false)
    const [syncedData, setSyncedData] = useState<string>(chatData.document.content)

    useEffect(() => {
        if (socket) {
            socket.on(socketMessageEvent.connect, () => {
                console.log("Connected to server", socket.id);
            });

            socket.on(socketMessageEvent.serverMessage, (msg: clientEditorMessageRequest) => {
                if (msg.userId != sender)
                    setServerMessage((prevMessages) => msg.message);
            });

            let snapShot = {};

            
            //sync
            socket.on(`${socketMessageEvent.syncInit}/${sender}`, (msg: any) => {
                //generate latest automerger snapshot 
                //send it back via socket
                snapShot = generateSnaphot();

                socket.emit(socketMessageEvent.sync, {
                    // socketId: msg.socketId,
                    snapShot: snapShot,
                    userId: msg.userId,
                    roomId: chatData.id
                });
            });

            socket.on(`${socketMessageEvent.syncComplete}/${sender}`, (msg: any) => {
                //capture the automerger snapshot 
                //init automerger
                var text = syncFromSnapshot(msg.snapShot);
                setIsSynced(true);
                setSyncedData(text);
            });
        }

    }, [socket]);

    useEffect(() => {
        // console.log("joinning room: ", chatData.id);
        joinRoom();
    }, [chatData.id]);

    const joinRoom = () => {
        var payload: joinRoomRequest = {
            roomId: chatData.id,
            userId: sender
        }
        if (socket)
            socket.emit(socketMessageEvent.joinRoom, payload);
    }

    const sendMessage = (change: Automerge.Change[]) => {
        var payload: clientEditorMessageRequest = {
            roomId: chatData.id,
            message: change,
            userId: sender
        }

        if (socket) {
            socket.emit(socketMessageEvent.clientMessage, payload);
        }

    };

    return (
        chatData &&
        <div className="">
            <Editor
                socketId={socket?.id}
                senderId={sender}
                serverMessage={serverMessage}
                sendMessage={sendMessage}
                documentText={syncedData}
                isSynced={isSynced}
            />
        </div>
    );
}
