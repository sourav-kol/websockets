import express from 'express';
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Room manager: Map of roomId -> Set of WebSocket clients
const rooms = new Map();

app.get('/', (req, res) => {
  res.send('WebSocket room-based server is running.');
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

wss.on('connection', (ws) => {
  ws.rooms = new Set();

  ws.on('message', (data) => {
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      console.log('Invalid JSON:', data);
      return;
    }

    const { type, roomId, message } = parsed;

    if (type === 'join' && roomId) {
      joinRoom(ws, roomId);
    } else if (type === 'leave' && roomId) {
      leaveRoom(ws, roomId);
    } else if (type === 'broadcast' && roomId && message) {
      broadcastToRoom(roomId, message, ws);
    }
  });

  ws.on('close', () => {
    for (const roomId of ws.rooms) {
      leaveRoom(ws, roomId);
    }
  });
});

function joinRoom(ws, roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.rooms.add(roomId);
  console.log(`Client joined room ${roomId}`);
}

function leaveRoom(ws, roomId) {
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(ws);
    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
    }
  }
  ws.rooms.delete(roomId);
  console.log(`Client left room ${roomId}`);
}

function broadcastToRoom(roomId, message, sender = null) {
  const clients = rooms.get(roomId);
  if (!clients) return;

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN && client !== sender) {
      client.send(JSON.stringify({
        from: 'room',
        roomId,
        message
      }));
    }
  }
}

server.listen(8080, () => {
  console.log('Server listening on ws://localhost:8080');
});
