import React, { useState, useEffect } from 'react';
import { MergeChanges } from '@/automerger';
import { change } from '@/types';

type Props = {
    serverMessage: change | undefined,
    sendMessage: (change: change) => void
}

export default function Editor(prop: Props) {
    const [text, setText] = useState<string>("initial");
    const [refresh, setRefresh] = useState<boolean>(false);

    const onClick = () => {
        setRefresh(!refresh);
    };

    //this will run for every char inputed...
    //get the position at which the change happened
    //keep track of char inserted and deleted
    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedText: string = e.target.value;

        let textarea: HTMLElement = document.getElementById('editor') as HTMLElement;

        var change: change = {
            text: updatedText,
            insertAt: 0,
            deleteAt: 0
        };

        textarea.addEventListener('input', () => {
            //@ts-expect-error
            let pos = textarea.selectionStart; // where the change happened (cursor)
            console.log("pos ", pos);

            let textUptoCursor = updatedText.slice(0, pos);

            const lines = textUptoCursor.split('\n');
            const row = lines.length;
            const col = lines[lines.length - 1].length + 1;

            console.log(`Changed at row: ${row}, column: ${col}`);
            //assuming only one char is inserted
            change.text = updatedText[updatedText.length - 1];
            change.insertAt = col;
            prop.sendMessage(change);
        });

        setText(updatedText);
    }

    useEffect(() => {
        if (!prop.serverMessage)
            return;

        console.log("server message", prop.serverMessage);

        let t = MergeChanges(text, prop.serverMessage);
        setText(t);
    }, [prop.serverMessage])

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <textarea
                className="w-3/4 h-40 border p-2 rounded resize-none"
                placeholder="Enter your text here..."
                value={text}
                onChange={onTextChange}
                id='editor'
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
