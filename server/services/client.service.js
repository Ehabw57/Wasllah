const getConnectedClients = (server, excludeClient) => {
  const clients = [];
  server.clients.forEach((c) => {
    if (c !== excludeClient && c.readyState === c.OPEN) {
      clients.push({ id: c.id, name: c.name, origin: c.origin });
    }
  });
  return clients;
};

module.exports = { getConnectedClients };
