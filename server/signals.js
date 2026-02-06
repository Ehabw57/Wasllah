const sendToClients = (ws, wss, data) => {
  ws.name = data.name;

  console.log(
    `User authenticated: ${ws.name} with ID: ${ws.id} with origin: ${ws.origin}`,
  );
  const connectedClients = [];
  wss.clients.forEach((c) => {
    if (c !== ws && c.readyState === c.OPEN) {
      console.log(
        `Connected client: ${c.name} with ID: ${c.id} with origin: ${c.origin}`,
      );
      connectedClients.push({
        id: c.id,
        name: c.name,
        origin: c.origin,
      });
      c.send(
        JSON.stringify({
          type: "connection",
          id: ws.id,
          name: ws.name,
          origin: ws.origin,
        }),
      );
    }
  });
  ws.send(
    JSON.stringify({
      type: "connectedClients",
      clients: connectedClients,
    }),
  );
};

module.exports = { sendToClients };
