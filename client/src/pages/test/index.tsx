'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@/components/Editor';
import { AutomergeTest } from '@/automerger';

export default function Test() {
    const [refresh, setRefresh] = useState<boolean>(false);

    const onClick = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        AutomergeTest();
    }, [refresh])

    return <Editor onClick={onClick} />
}
