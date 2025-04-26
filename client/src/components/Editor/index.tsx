import React, { useState, useEffect } from 'react';
import { MergeChanges } from '@/automerger';
import { change } from '@/types';

type Prop = {
}
export default function Editor(prop: Prop) {
    const [text, setText] = useState<string>("");

    const [refresh, setRefresh] = useState<boolean>(false);

    const onClick = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        let remoteChange: change = {
            insertAt: 9,
            deleteAt: 0,
            text: " user"
        };

        let t = MergeChanges("hey there", remoteChange);
        setText(t);
        
    }, [refresh])

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <textarea
                className="w-3/4 h-40 border p-2 rounded resize-none"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={onClick}
            >
                Submit
            </button>
        </div>
    );
}
