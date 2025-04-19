'use client';

import { useEffect, useState } from 'react';
import { io, Socket, SocketOptions } from "socket.io-client";

export default function Play() {
    const [name, setName] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null); // Initialize socket as null
    // var x: SocketOptions
    useEffect(() => {
        const tempSocket = io("http://localhost:8080/");
        setSocket(tempSocket); // Set the socket state to the new socket instance

        console.log("sending...", tempSocket.id);
        
        tempSocket.on("connect", () => {
            console.log("Connected to server");
        });
    }, []);

    useEffect(() => {
        if(socket)
            socket.emit("send_msg", name);
    }, [name]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);
    };

    return (
        <div className="">
            <h1>start playing</h1>
            <input type="text" placeholder="Enter your name" onChange={handleInputChange} value={name} />
        </div>
    )
}