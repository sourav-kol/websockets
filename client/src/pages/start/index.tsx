'use client';

import { joinRoomRequest, clientMessageRequest } from '@/types';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import JoinedRoom from '@/components/joinedRoom';
import JoinRoom from '@/components/joinRoom';

export default function Play() {
    const [name, setName] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null); // Initialize socket as null
    const [isJoinedRoom, setIsJoindedRoom] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [serverMessage, setServerMessage] = useState<string[]>([]);

    useEffect(() => {
        //todo: take from config files
        const tempSocket = io("http://localhost:8080/");
        setSocket(tempSocket); // Set the socket state to the new socket instance

        console.log("sending...", tempSocket.id);

        tempSocket.on("connect", () => {
            console.log("Connected to server");
        });

        tempSocket.on("server_msg", (msg: clientMessageRequest) => {
            console.log("Message from server:", msg);
            setServerMessage((prevMessages) => [...prevMessages, msg.message]);
        });
    }, []);

    const sendMessage = () => {
        var payload: clientMessageRequest = {
            roomId: name,
            message: message,
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

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const message = event.target.value;
        setMessage(message);
    }

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
                <JoinedRoom
                    name={name}
                    message={message}
                    serverMessage={serverMessage}
                    handleMessageChange={handleMessageChange}
                    sendMessage={sendMessage}
                />
            }
        </div>
    )
}