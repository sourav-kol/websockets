import React, { useState } from 'react';

type Prop = {
    onClick: () => void;
}
export default function Editor(prop: Prop) {
    const [text, setText] = useState<string>("");

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
                onClick={prop.onClick}
            >
                Submit
            </button>
        </div>
    );
}
