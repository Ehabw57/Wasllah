const { info } = require('../utils/logger');
const { broadcastDisconnection } = require('../services/broadcast.service');

const handleDisconnection = (client, server) => {
  info(`Client disconnected: ID ${client.id}`);
  broadcastDisconnection(server, client.id);
};

module.exports = { handleDisconnection };
