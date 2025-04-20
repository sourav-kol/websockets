'use client';

import { joinRoomRequest, clientMessageRequest } from '@/types';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

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
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-xl font-bold">Join Room</h1>
                    <input 
                        type="text" 
                        placeholder="Enter your room name" 
                        onChange={handleInputChange} 
                        value={name} 
                        className="border p-2 rounded"
                    />
                    <button 
                        onClick={joinRoom} 
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Click to join room
                    </button>
                </div>
            }
            {/* show messages UI */}
            {isJoinedRoom &&
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-xl font-bold">Joined Room {name}</h1>
                    <div className="flex flex-col items-center space-y-2">
                        <input 
                            type="text" 
                            placeholder="Enter your message" 
                            onChange={handleMessageChange} 
                            value={message} 
                            className="border p-2 rounded"
                        />
                        <button 
                            onClick={sendMessage} 
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Click to send message
                        </button>
                    </div>
                    <div className="w-full max-w-md">
                        <h1 className="text-lg font-semibold">Messages</h1>
                        <div className="space-y-2">
                            {serverMessage.map((msg, index) => (
                                <div key={index} className="p-2 border rounded">
                                    {msg}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}