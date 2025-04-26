import { useEffect, useState } from 'react';

type Props = {
    name: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void
}


export default function JoinRoom(prop: Props) {
    return <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl font-bold">Join Room</h1>
        <input
            type="text"
            placeholder="Enter your room name"
            onChange={prop.handleInputChange}
            value={prop.name}
            className="border p-2 rounded"
        />
        <button
            onClick={prop.onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            Click to join room
        </button>
    </div>
}