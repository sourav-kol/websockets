'use client';

import { useEffect, useState } from 'react';

export default function Play() {
    const [socket, setsocket] = useState<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [name, setName] = useState<string>("");
    const [id, setId]  = useState<string>(crypto.randomUUID());

    useEffect(() => {
        // Prevent server-side execution
        if (typeof window === 'undefined') return;

        // Connect to WebSocket server
        var socketInit = new WebSocket('ws://localhost:8080/668f6944-4497-4273-b3fc-40a99f7b4a2f');
        setsocket(socketInit);

        if (socketInit.OPEN) {
            socketInit.onopen = () => {
                console.log('WebSocket connected');
                setConnected(true);
            };

            socketInit.onmessage = (event) => {
                const message = event.data;
                console.log('Received:', message);
            };

            socketInit.onclose = () => {
                console.log('WebSocket disconnected');
                setConnected(false);
            };

            socketInit.onerror = (err) => {
                console.error('WebSocket error:', err);
            };

        }
        // Cleanup on unmount
        return () => {
            socket?.close();
        };
    }, []);

    useEffect(() => {
        if (connected && socket) {
            // Send a message to the server
            setInterval(() => {
                socket?.send(`${id} - it is ${Date.now()} now`);
            }, 100);
        }
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