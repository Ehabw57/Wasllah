const { info } = require('../utils/logger');

const broadcastNewConnection = (server, newClient) => {
  const payload = JSON.stringify({
    type: 'connection',
    id: newClient.id,
    name: newClient.name,
    origin: newClient.origin,
  });

  server.clients.forEach((client) => {
    if (client !== newClient && client.readyState === client.OPEN) {
      info(`Connected client: ${client.name} | ID: ${client.id} | Origin: ${client.origin}`);
      client.send(payload);
    }
  });
};

const broadcastDisconnection = (server, disconnectedClientId) => {
  const payload = JSON.stringify({ type: 'disconnection', id: disconnectedClientId });
  server.clients.forEach((client) => {
    if (client.readyState === client.OPEN) client.send(payload);
  });
};

const sendConnectedClientsList = (client, clients) => {
  client.send(JSON.stringify({ type: 'connectedClients', clients }));
};

module.exports = { broadcastNewConnection, broadcastDisconnection, sendConnectedClientsList };
