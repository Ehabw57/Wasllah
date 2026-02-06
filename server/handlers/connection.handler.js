const { v4: uuidv4 } = require('uuid');
const { handleMessage } = require('./message.handler');
const { handleDisconnection } = require('./disconnection.handler');

const handleConnection = (client, request, server) => {
  client.origin = request.headers['origin'];
  client.id = uuidv4();

  client.on('message', (msg) => handleMessage(client, server, msg));
  client.on('close', () => handleDisconnection(client, server));
};

module.exports = { handleConnection };
