'use client';

import { useEffect, useRef, useState } from 'react';
// import WebSocket from 'ws';

export default function Play() {
    const socketRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Prevent server-side execution
        if (typeof window === 'undefined') return;

        // Connect to WebSocket server
        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
            setConnected(true);
        };

        socketRef.current.onmessage = (event) => {
            const message = event.data;
            console.log('Received:', message);
            // Handle game updates here
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket disconnected');
            setConnected(false);
        };

        socketRef.current.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        // Cleanup on unmount
        return () => {
            socketRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (connected) {
            // Send a message to the server
            socketRef.current?.send('Hello from the client!');
        }
    }, [connected]);

    return (
        <div className="">
            <h1>start playing</h1>
        </div>
    )
}