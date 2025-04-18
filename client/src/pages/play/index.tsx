'use client';

import { useEffect, useState } from 'react';
import { io, SocketOptions } from "socket.io-client";

export default function Play() {
    const [name, setName] = useState<string>("");
    
    var x: SocketOptions
    useEffect(() => {
        const socket = io("http://localhost:8080/");
        console.log("sending...");
        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("send_msg", name);
        });
    }, [name])

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