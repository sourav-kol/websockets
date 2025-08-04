'use client';

import { useEffect, useState } from 'react';

import { joinRoomRequest, clientEditorMessageRequest, change, chatGroup } from '@/types';
import { useSocket } from '@/context/socket-provider';
import Editor from '@/components/editor/text-area';
import { socketMessageEvent } from '@/constants/constants';

type Prop = {
    chatData: chatGroup,
    sender: string
}

export default function ChatGroupDetail(props: Prop) {
    const { chatData, sender } = props;
    const socket = useSocket();
    const [serverMessage, setServerMessage] = useState<change>();

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

            joinRoom();
        }

    }, [socket]);

    const joinRoom = () => {
        var payload: joinRoomRequest = {
            roomId: chatData.roomId
        }
        if (socket)
            socket.emit(socketMessageEvent.joinRoom, payload);
    }

    const sendMessage = (change: change) => {
        var payload: clientEditorMessageRequest = {
            roomId: chatData.roomId,
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
            />
        </div>
    );
}
