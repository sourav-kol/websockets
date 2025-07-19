type Prop = {
    chatGroupList?: string[],
    currentChatGroup?: string,
    chatUsers?: string[]
    chats?: string[]
}

export default function ChatLayout(props: Prop) {
    return (
        <>
            <div className="gap-1 h-[83vh] w-11/12 max-w-6xl mx-auto my-8 font-black grid grid-cols-[20%_60%_1fr]">
                <div className="bg-gray-100 h-full flex flex-col">
                    <div className="bg-green-100 h-1/12 text-center">
                        My Groups
                    </div>

                    <div className="bg-red-100 h-11/12">
                        Groups list
                    </div>
                </div>

                <div className="bg-white h-full flex flex-col items-center justify-center">
                    <div className=" w-full h-1/12 bg-gray-100 text-center">
                        Group Name
                    </div>
                    <div className="w-full h-11/12 bg-gray-500">
                        main area
                    </div>
                </div>

                <div className="h-full grid grid-rows-[30%_1fr] gap-1">
                    <div className="bg-white h-full flex flex-col items-center justify-center">
                        <div className="w-full h-2/12 bg-red-100 text-center">
                            Users
                        </div>
                        <div className="w-full h-10/12 bg-green-200">
                            user list
                        </div>
                    </div>

                    <div className="bg-gray-300 text-center flex flex-col items-center justify-center">
                        <div className="w-full h-1/12 bg-red-100 text-center">
                            Chats
                        </div>
                        <div className="w-full h-11/12 bg-green-200">
                            messages
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
