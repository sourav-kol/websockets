'use client';

import React, { useEffect } from 'react';
// import Editor from '@/components/Editor';
import { AutomergeTest, MergeChanges } from '@/automerger';

export default function Test() {
    useEffect(() => {
        MergeChanges("hey", { text: " t", insertAt: 0, deleteAt: 0 });
    }, [])
    // return <Editor />
    return <>editor here....</>
}
