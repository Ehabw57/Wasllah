const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');
const { handleConnection } = require('./handlers/connection.handler');

dotenv.config();

const host = process.env.WS_HOST || 'localhost';
const port = Number(process.env.WS_PORT) || 3000;

const wss = new WebSocketServer({ host, port });

wss.on('connection', (ws, req) => handleConnection(ws, req, wss));

console.log(`WebSocket server running on ws://${host}:${port}`);
