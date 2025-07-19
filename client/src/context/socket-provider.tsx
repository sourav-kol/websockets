'use client';

import React, { createContext, useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";

const socketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        //todo: take from config files
        const tempSocket = io("http://localhost:8080/");
        setSocket(tempSocket); // Set the socket state to the new socket instance

        console.log("sending...", tempSocket.id);
    }, []);

    return (
        <socketContext.Provider value={socket}>
            {children}
        </socketContext.Provider>
    );
}

// Custom hook to use the context
export const useSocket = () => useContext(socketContext);