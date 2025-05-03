'use client';

import React, { useEffect } from 'react';
// import Editor from '@/components/Editor';
import { AutomergeTest, MergeChanges } from '@/automerger';
import diff from 'fast-diff';

export default function Test() {

    const difference = () => {

        const oldText = "hello world man";
        const newText = "ello wor mans";

        // Find the diff between old and new text
        const differences = diff(oldText, newText);
        console.log("diff: ", differences);

        let diffFrom = [];

        // Now walk through the diffs
        let index = 0;
        for (const [op, data] of differences) {
            if (op === diff.EQUAL) {
                index += data.length; // Move index forward
            } else if (op === diff.INSERT) {
                diffFrom.push({ op: "insert", from: index, to:0, text: data });
                index += data.length;
            } else if (op === diff.DELETE) {
                diffFrom.push({ op: "delete", from: index, to:data.length, text: data });
                index += data.length;
            }
        }

        console.log(diffFrom);
    }
    useEffect(() => {
        // difference();
        AutomergeTest();
    }, [])
    // return <Editor />

    const transformer = () => {

    }

    return <>editor here....</>
}
