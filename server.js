var port = process.env.PORT || 8888;
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: port });
