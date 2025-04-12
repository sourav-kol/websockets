import { WebSocket } from 'ws';
import { app, server } from ".././express-server";

const wss = new WebSocket.Server({ noServer: true });

const createWebsocketConnection = (id: string) => {

    wss.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            console.log(`Hi, there => ${message}`);
        });
    });
    console.log('server details ');
};

const upgradeConnection = (req: any, socket: any, head: any) => {
    server().on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws)=>{
            wss.emit('connection', ws, req);
        })
    });
    console.log("upgrading connection");
}

export { wss, createWebsocketConnection, upgradeConnection };