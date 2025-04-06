import express from "express";
import { WebSocket, WebSocketServer } from 'ws';

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ port:8080 });

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    console.log(`Hi, there => ${message}`);
    // ws.send(`You sent => ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
})