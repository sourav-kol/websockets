import ChatLayout from "@/layouts/chat-layout";
import { SocketProvider } from "@/context/socket-provider";

export default function Home() {
    return (
        <SocketProvider>
            <div className="font-black">
                <ChatLayout />
            </div>
        </SocketProvider>
    );
}
