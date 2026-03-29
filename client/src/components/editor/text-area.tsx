'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MergeChanges, getChanges, getText, setInitialDocument } from '@/helper/automerger/automergerHelper';
import { diffFinder } from '@/helper/textDifference/textDiffHelper';

type Props = {
    senderId: string
    serverMessage: any | undefined,
    sendMessage: (change: any) => void,
    documentText: string,
    syncedData: boolean
}

export default function Editor(prop: Props) {
    const [text, setText] = useState<string>("");
    const [oldText, setOldText] = useState<string>(text);
    const timeoutRef = useRef(null);

    useEffect(() => {
        console.log("prop: ", prop)
        if (!prop.syncedData) {
            console.log("re-rendering editor");
            setText(prop.documentText);
            setOldText(prop.documentText);
            setInitialDocument(prop.documentText);
        } else {
            var text = getText();

            setText(text);
            setOldText(text);
        }
    }, [prop.documentText]);

    const syncChanges = (val: any) => {
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
    const handleAction = (updatedText: string) => {
        //find the difference
        var diff = diffFinder(oldText, updatedText);

        setOldText(updatedText);
        var automergeChange = getChanges(oldText, diff);
        console.log("sending this: ", automergeChange);

        syncChanges(automergeChange);
    }

    //merging remote changes
    useEffect(() => {
        console.log("ehejrhej")
        if (!prop.serverMessage)
            return;

        let mergedText = MergeChanges(text, prop.serverMessage);
        setText(mergedText);
        setOldText(mergedText);
    }, [prop.serverMessage]);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="h-1/12 text-xl font-bold">{prop.senderId}</h1>
            <div className="w-3/4 h-11/12">
                <textarea
                    rows={80}
                    cols={500}
                    className="bg-gray-800 w-full h-8/12 p-2 rounded resize-none"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={debounce}
                    id='editor'
                />
            </div>
        </div>
    );
}
