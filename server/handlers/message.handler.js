const { getConnectedClients } = require("../services/client.service");
const {
  broadcastNewConnection,
  sendConnectedClientsList,
} = require("../services/broadcast.service");
const { info } = require("../utils/logger");

const MESSAGE_TYPES = { AUTH: "auth" };

const handleClientAuthentication = (client, server, data) => {
  client.name = data.name;
  info(
    `User authenticated: ${client.name} | ID: ${client.id} | Origin: ${client.origin}`,
  );
  const connectedClients = getConnectedClients(server, client);
  broadcastNewConnection(server, client);
  sendConnectedClientsList(client, connectedClients);
};

const handelTargetedClient = (client, server, data) => {
  server.clients.forEach((c) => {
    if (c.id === data.targetId && c.readyState === c.OPEN) {
      c.send(JSON.stringify({ ...data, from: client.id }));
    }
  });
};

const handleMessage = (client, server, raw) => {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.log(e);
    return;
  }

  if (data.type === MESSAGE_TYPES.AUTH)
    handleClientAuthentication(client, server, data);
  else handelTargetedClient(client, server, data);
};

module.exports = { handleMessage };
