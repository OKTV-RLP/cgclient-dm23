const { CasparCG } = require('casparcg-connection');
const settings = require('./settings');

//Get CasparCG Settings
const cgsIP = settings.get('cgsServer.IP');
const cgsPort = settings.get('cgsServer.Port');
const cgsQueue = settings.get('cgsServer.Queue');

// Initiate Server Connection
module.exports = new CasparCG({
	host: cgsIP,
	port: cgsPort,
	queue: cgsQueue,
	autoConnect: false,
	autoReconnectInterval: 10000 // 10 Sec
});
