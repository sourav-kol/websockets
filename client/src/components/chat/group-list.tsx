'use client';

import { chatGroup } from "@/types";

type Prop = {
    data: chatGroup[]
}

export default function ChatGroupList(props: Prop) {
    const { data } = props;
    return (
        <div className="gap-0.5 flex flex-col">
            {data.map((group, index) =>
                <div key={group.title + index} className="p-2 border-cyan-50 border-b-1 flex flex-col">
                    <span className="">
                        <h3>
                            {group.title}
                        </h3>
                    </span>
                    <span>
                        <p className="text-[12px] font-semibold">2 members</p>
                    </span>
                </div>
            )}
        </div>
    );
}
