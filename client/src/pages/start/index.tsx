'use client';

import { joinRoomRequest, clientEditorMessageRequest, change } from '@/types';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import JoinRoom from '@/components/joinRoom';
import Editor from '@/components/Editor';

export default function Start() {
    const [name, setName] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null); // Initialize socket as null
    const [isJoinedRoom, setIsJoindedRoom] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<change>();

    useEffect(() => {
        //todo: take from config files
        const tempSocket = io("http://localhost:8080/");
        setSocket(tempSocket); // Set the socket state to the new socket instance

        console.log("sending...", tempSocket.id);

        tempSocket.on("connect", () => {
            console.log("Connected to server");
        });

        tempSocket.on("server_msg", (msg: clientEditorMessageRequest) => {
            console.log("Message from server:", msg);
            setServerMessage((prevMessages) => msg.message);
        });
    }, []);

    const sendMessage = (change: change) => {
        var payload: clientEditorMessageRequest = {
            roomId: name,
            message: change,
            sender: (Math.random() * 1000).toString()
        }
        if (socket) {
            socket.emit("client_msg", payload);
        }

    };

    const joinRoom = () => {
        var payload: joinRoomRequest = {
            roomId: name
        }
        if (socket)
            socket.emit("join_room", payload);

        setIsJoindedRoom(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            {/* show join room UI */}
            {!isJoinedRoom &&
                <JoinRoom
                    name={name}
                    handleInputChange={handleInputChange}
                    onClick={joinRoom}
                />
            }
            {/* show messages UI */}
            {isJoinedRoom &&
                <Editor
                    serverMessage={serverMessage}
                    sendMessage={sendMessage}
                />
            }
        </div>
    )
}