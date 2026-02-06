const { WebSocketServer } = require("ws");
const { v4: uuid4 } = require("uuid");
const {sendToClients} = require('./signals')

const wss = new WebSocketServer({ host: "localhost", port: 3000 });

wss.on("connection", (ws, req) => {
  ws.origin = req.headers["origin"];
  ws.id = uuid4();

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type == "auth") {
      sendToClients(ws, wss, data)
    }
  });

  ws.on("close", () => {
    wss.clients.forEach((c) => {
      c.send(JSON.stringify({ type: "disconnection", id: ws.id }));
    });
  });
});

