'use client';

import { useEffect, useState } from 'react';

import { joinRoomRequest, clientEditorMessageRequest, change, chatGroup, GroupResponse } from '@/types';
import { useSocket } from '@/context/socket-provider';
import Editor from '@/components/editor/text-area';
import { socketMessageEvent } from '@/constants/constants';
import { next as Automerge } from "@automerge/automerge";

type Prop = {
    chatData: GroupResponse,
    sender: string
}

export default function ChatGroupDetail(props: Prop) {
    const { chatData, sender } = props;
    const socket = useSocket();
    const [serverMessage, setServerMessage] = useState<Automerge.Change[]>();

    useEffect(() => {
        if (socket) {
            socket.on(socketMessageEvent.connect, () => {
                console.log("Connected to server", socket.id);
            });

            socket.on(socketMessageEvent.serverMessage, (msg: clientEditorMessageRequest) => {
                console.log("Message from server:", msg);
                if (msg.sender != sender)
                    setServerMessage((prevMessages) => msg.message);
            });
        }

    }, [socket]);

    useEffect(() => {
        console.log("joinning room: ", chatData.id);
        joinRoom();
    }, [chatData.id]);

    const joinRoom = () => {
        var payload: joinRoomRequest = {
            roomId: chatData.id
        }
        if (socket)
            socket.emit(socketMessageEvent.joinRoom, payload);
    }

    const sendMessage = (change: Automerge.Change[]) => {
        console.log("hehere", change)
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
            />
        </div>
    );
}
