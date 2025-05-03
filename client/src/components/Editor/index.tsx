import React, { useState, useEffect, useRef } from 'react';
import { MergeChanges, getChanges } from '@/automerger';
import { changeData } from '@/types';
import diff from 'fast-diff';
import { updateText } from '@automerge/automerge/next';

type Props = {
    senderId: string
    serverMessage: any | undefined,
    sendMessage: (change: any) => void
}

export default function Editor(prop: Props) {
    const [text, setText] = useState<string>("hey");
    const [oldText, setOldText] = useState<string>(text);
    const timeoutRef = useRef(null);

    // useEffect(() => {
    //     // setInitialDocument(text);
    // }, []);

    const syncChanges = (val: any) => {
        console.log("sending changes to server: ", val);
        prop.sendMessage(val);
    }

    const debounce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedText: string = e.target.value;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        //@ts-ignore
        timeoutRef.current = setTimeout(() => {
            handleAction(updatedText);
        }, 400);

        setText(updatedText);
    }

    //get the position at which the change happened
    //keep track of char inserted / updated / deleted
    const handleAction = (updatedText:string) => {
        //find the difference
        var diff = diffFinder(oldText, updatedText);
        var automergeChange = getChanges(oldText, diff);
        syncChanges(automergeChange);
    }

    //merging remote changes
    useEffect(() => {
        if (!prop.serverMessage)
            return;

        let mergedText = MergeChanges(text, prop.serverMessage);
        setText(mergedText);
        setOldText(mergedText);
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
                changes.push({ op: "delete", from: index, to: data.length, text: "" });
                index += data.length;
            }
        }
        console.log("old: ", oldState, "new: ", newState);
        console.log("changes: ", changes);

        setOldText(newState);

        return changes;
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-xl font-bold">{prop.senderId}</h1>
            <div className="w-3/4">
                <textarea
                    rows={80}
                    cols={300}
                    className="w-full h-40 border p-2 rounded resize-none"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={debounce}
                    id='editor'
                />
            </div>
        </div>
    );
}
