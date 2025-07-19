import ChatGroupList from "@/components/chat/group-list";
import { useState } from "react";
import { chatGroup } from "@/types";

type Prop = {

}

export default function ChatLayout(props: Prop) {

    const [chatGroups, setChatGroups] = useState<chatGroup[]>([{title: "school group"}, {title: "college group"}, {title: "work group"}]);

    return (
        <>
            <div className="gap-1 h-[83vh] w-11/12 max-w-6xl mx-auto my-8 font-white grid grid-cols-[20%_60%_1fr]">
                <div className="bg-primary rounded-md overflow-hidden h-full flex flex-col">
                    <div className="h-1/12 text-center shadow shadow-black/30 z-10">
                        My Groups
                    </div>
                    <div className="bg-primary h-11/12 overflow-y-scroll">
                        <ChatGroupList data={chatGroups} />
                    </div>
                </div>

                <div className="bg-primary rounded-md overflow-hidden h-full flex flex-col items-center justify-center">
                    <div className="w-full h-1/12 text-center shadow shadow-black/30 z-10">
                        Group Name
                    </div>
                    <div className="w-full h-11/12">
                        main area
                    </div>
                </div>

                <div className="rounded-md overflow-hidden h-full grid grid-rows-[30%_1fr] gap-1">
                    <div className="bg-primary overflow-hiddenh-full flex flex-col items-center justify-center">
                        <div className="w-full h-3/10 text-center shadow shadow-black/30 z-10">
                            Users
                        </div>
                        <div className="w-full h-8/10">
                            user list
                        </div>
                    </div>

                    <div className=" bg-primary rounded-md overflow-hidden text-center flex flex-col items-center justify-center">
                        <div className="w-full h-2/21 text-center shadow shadow-black/30 z-10">
                            Chats
                        </div>
                        <div className="w-full h-19/21">
                            messages
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
