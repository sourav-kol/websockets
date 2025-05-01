import React, { useState, useEffect } from 'react';
import { MergeChanges, getChanges, setInitialDocument } from '@/automerger';
import { changeData } from '@/types';
import diff from 'fast-diff';

type Props = {
    senderId: string
    serverMessage: any | undefined,
    sendMessage: (change: any) => void
}

export default function Editor(prop: Props) {
    const [text, setText] = useState<string>("hey");
    const [oldText, setOldText] = useState<string>(text);

    useEffect(() => {
        setInitialDocument(text);
    }, []);

    const syncChanges = (val: any) => {
        prop.sendMessage(val);
    }

    //this will run for every char inputed...
    //get the position at which the change happened
    //keep track of char inserted / updated / deleted
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedText: string = e.target.value;
        setText(updatedText);

        //find the difference
        var diff = diffFinder(oldText, updatedText);
        var automergeChange = getChanges(diff);
        syncChanges(automergeChange);
    }

    //merging remote changes
    useEffect(() => {
        if (!prop.serverMessage)
            return;

        let mergedText = MergeChanges(prop.serverMessage);
        setText(mergedText);
    }, [prop.serverMessage])

    //todo: fix typescript and move to helper file
    const diffFinder = (oldState: string, newState: string) => {
        const differences = diff(oldState, newState);

        let changes: changeData[] = [];

        let index = 0;
        for (const [op, data] of differences) {
            if (op === diff.EQUAL) {
                index += data.length;
            } else if (op === diff.INSERT) {
                changes.push({ op: "insert", from: index, to: 0, text: data });
                index += data.length;
            } else if (op === diff.DELETE) {
                changes.push({ op: "delete", from: index, to: data.length, text: data });
                index += data.length;
            }
        }
        console.log("changes: ", changes);

        setOldText(newState);

        return changes;
    }

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
