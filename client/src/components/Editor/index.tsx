import React, { useState, useEffect } from 'react';
import { MergeChanges } from '@/automerger';
import { change } from '@/types';
import { send } from 'process';

type Props = {
    senderId: string
    serverMessage: change | undefined,
    sendMessage: (change: change) => void
}

export default function Editor(prop: Props) {
    const [text, setText] = useState<string>("hey");

    const syncChanges = (val: string) => {
        let textarea: HTMLElement = document.getElementById('editor') as HTMLElement;

        var change: change = {
            text: "",
            insertAt: 0,
            deleteAt: 0
        };

        //@ts-expect-error
        let pos = textarea.selectionStart;

        let textUptoCursor = val.slice(0, pos);

        const lines = textUptoCursor.split('\n');
        const row = lines.length;
        const col = lines[lines.length - 1].length - 1;

        change.text = val[val.length - 1];
        change.insertAt = col;

        console.log("sending..", change, val);
        prop.sendMessage(change);
    }

    //this will run for every char inputed...
    //get the position at which the change happened
    //keep track of char inserted and deleted
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedText: string = e.target.value;
        setText(updatedText);

        syncChanges(updatedText);
    }

    useEffect(() => {
        if (!prop.serverMessage)
            return;

        console.log("before merge", "text: ", text, "recieved: ", prop.serverMessage);

        let t = MergeChanges(text, prop.serverMessage);
        console.log("text after merge", t);
        setText(t);
    }, [prop.serverMessage])

    return (
        <>
            <h1>{prop.senderId}</h1>
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <textarea
                    className="w-3/4 h-40 border p-2 rounded resize-none"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={handleTextChange}
                    id='editor'
                />
            </div>
        </>
    );
}
