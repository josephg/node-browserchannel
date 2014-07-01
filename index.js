exports.server = require('./dist/server');

// This exposes the bare browserchannel implementation.
//exports.goog = require('./dist/node-browserchannel.js');

var BCSocket = require('./dist/node-bcsocket-uncompressed.js');
exports.BCSocket = BCSocket.BCSocket;
exports.setDefaultLocation = BCSocket.setDefaultLocation;
