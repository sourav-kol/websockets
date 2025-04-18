import { app } from "../express-server";
import { websocketEvents } from "../helpers/constants";
import { Server, ServerOptions } from "socket.io";
import http from "http";

const httpServer = http.createServer(app);

//@ts-ignore
const options: ServerOptions = { cors: { origin: "http://localhost:3000" }};

const io = new Server(httpServer, options);

const testMethod = () => {
    // io.on(websocketEvents.CONNECT, (socket) => {
    //     //@ts-ignore
    //     socket.on(websocketEvents.MESSAGE, (message) => {
    //         console.log("client message: ", message);
    //     });

    //     //@ts-ignore
    //     socket.on("error", (err) => {
    //         console.log("error: ", err);
    //         if (err) {
    //             console.log("disconnnecting...");
    //             socket.disconnect();
    //             console.log("disconnnected.");
    //         }
    //     });
    // })

    io.on("connection", (socket) => {
        console.log("🔌 Client connected:", socket.id);

        socket.on("message", (msg) => {
            console.log("Message from client:", msg);
            socket.emit("message", "Hi from server!");
        });
    });
}

export { io, testMethod };
