import { useEffect, useState } from 'react';

type Props = {
    name: string,
    message: string,
    serverMessage: string[],
    handleMessageChange: (event:React.ChangeEvent<HTMLInputElement>) => void,
    sendMessage: () => void
}

export default function JoinedRoom(prop: Props) {
    return <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl font-bold">Joined Room {prop.name}</h1>
        <div className="flex flex-col items-center space-y-2">
            <input
                type="text"
                placeholder="Enter your message"
                onChange={prop.handleMessageChange}
                value={prop.message}
                className="border p-2 rounded"
            />
            <button
                onClick={prop.sendMessage}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Click to send message
            </button>
        </div>
        <div className="w-full max-w-md">
            <h1 className="text-lg font-semibold">Messages</h1>
            <div className="space-y-2">
                {prop.serverMessage.map((msg, index) => (
                    <div key={index} className="p-2 border rounded">
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    </div>
}