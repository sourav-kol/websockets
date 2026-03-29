'use client';

import { useEffect, useState } from 'react';

import { joinRoomRequest, clientEditorMessageRequest, change, chatGroup, GroupResponse } from '@/types';
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
    const [syncedData, setSyncedData] = useState<boolean>(false)

    useEffect(() => {
        if (socket) {
            socket.on(socketMessageEvent.connect, () => {
                console.log("Connected to server", socket.id);
            });

            socket.on(socketMessageEvent.serverMessage, (msg: clientEditorMessageRequest) => {
                if (msg.sender != sender)
                    setServerMessage((prevMessages) => msg.message);
            });

            let snapShot = {};

            //sync
            socket.on(socketMessageEvent.syncInit, (msg: any) => {
                //generate latest automerger snapshot 
                //send it back via socket
                snapShot = generateSnaphot();

                socket.emit(socketMessageEvent.sync, {
                    socketId: msg.socketId,
                    snapShot: snapShot
                });
            });

            socket.on(socketMessageEvent.syncComplete, (msg: any) => {
                //capture the automerger snapshot 
                //init automerger
                syncFromSnapshot(msg.snapShot);
                setSyncedData(true);
            });
        }

    }, [socket]);

    useEffect(() => {
        // console.log("joinning room: ", chatData.id);
        joinRoom();
    }, [chatData.id]);

    // useEffect(() => {

    // },[syncedData]);

    const joinRoom = () => {
        var payload: joinRoomRequest = {
            roomId: chatData.id
        }
        if (socket)
            socket.emit(socketMessageEvent.joinRoom, payload);
    }

    const sendMessage = (change: Automerge.Change[]) => {
        var payload: clientEditorMessageRequest = {
            roomId: chatData.id,
            message: change,
            sender: sender
        }

        if (socket) {
            socket.emit(socketMessageEvent.clientMessage, payload);
        }

    };

    return (
        chatData &&
        <div className="">
            <Editor
                senderId={sender}
                serverMessage={serverMessage}
                sendMessage={sendMessage}
                documentText={chatData.document.content}
                syncedData={syncedData}
            />
        </div>
    );
}
