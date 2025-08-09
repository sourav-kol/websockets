'use client';

import { GroupResponse } from "@/types";

type Prop = {
    data: GroupResponse[],
    selectGroup: (group: GroupResponse) => void
}

export default function ChatGroupList(props: Prop) {
    const { data, selectGroup } = props;
    return (
        <div className="gap-0.5 flex flex-col">
            {data.map((group, index) =>
                <div key={group.name + index} className="p-2 border-cyan-50 border-b-1 flex flex-col" onClick={() => selectGroup(group)} >
                    <span className="">
                        <h3>
                            {group.name}
                        </h3>
                    </span>
                    <span>
                        <p className="text-[12px] font-semibold">{group.members.length} members</p>
                    </span>
                </div>
            )}
        </div>
    );
}
