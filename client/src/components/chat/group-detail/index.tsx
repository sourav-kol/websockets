import { useEffect, useState } from 'react';

import { clientEditorMessageRequest, change, chatGroup } from '@/types';
import { useSocket } from '@/context/socket-provider';
import Editor from '@/components/Editor';
import { socketMessageEvent } from '@/constants';

type Prop = {
    chatData: chatGroup
}

export default function ChatGroupDetail(props: Prop) {
    const { chatData } = props;
    const socket = useSocket();
    const [serverMessage, setServerMessage] = useState<change>();

    //take from user context
    const [sender, setSender] = useState<string>("user A");

    useEffect(() => {
        if (socket) {
            socket.on(socketMessageEvent.connect, () => {
                console.log("Connected to server");
            });

            socket.on(socketMessageEvent.serverMessage, (msg: clientEditorMessageRequest) => {
                console.log("Message from server:", msg);
                if (msg.sender != sender)
                    setServerMessage((prevMessages) => msg.message);
            });
        }

    }, [socket]);

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
