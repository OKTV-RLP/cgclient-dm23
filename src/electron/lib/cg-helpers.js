const CG = require('./casparcg');
const log = require('electron-log');
const settings = require('./settings');

const getCGConnection = () => {
	let connection = {
		status: CG.connected,
		host: CG.host,
		port: CG.port
	};
	const conString = connection.status ? 'connected to' : 'disconnected from';
	log.info(`CG-Server ${conString} ${connection.host}:${connection.port}`);
	return connection;
};

// Parse Data as CasparCG XML String
const parseCasparXML = (templateData, keys) => {
	let data = '"<templateData>';
	keys.forEach((key, i) => {
		data += `<componentData id=\\"${key}\\"><data id=\\"text\\" value=\\"${templateData[i]}\\"/></componentData>`;
	});
	data += '</templateData>"';
	return data;
};

// Get CG-Layer from Slot-Name
const getLayerFromSlot = async (slot) => {
	const layer = await settings.get(`cgtTemplate.${slot}.layer`);
	return layer;
};

// Play Template
const cgPlay = async (slot, auto, templateData, apDuration = 5) => {
	const channel = await settings.get(`cgtServer.Channel`);
	const templateSettings = await settings.get(`cgtTemplate.${slot}`);
	const { template, keys, layer, sendJSON } = templateSettings;
	let data;
	if (sendJSON) {
		data = {};
		keys.forEach((key, i) => {
			data[key] = templateData[i];
		});
	} else {
		data = parseCasparXML(templateData, keys);
	}

	const { error, request } = CG.cgAdd({
		channel,
		layer,
		cgLayer: 1,
		template,
		playOnLoad: 1,
		data
	});

	if (error) {
		log.error('Error sending cgAdd', error);
	} else {
		await request;
		log.debug(`CG Add: ${template}`);
	}

	if (auto) {
		const duration = apDuration * 1000;
		log.debug(`Auto-Play on ${template} Duration ${duration}ms.`);
		setTimeout(async () => {
			cgStop(layer);
		}, duration);
	}
};

// Stop Template
const cgStop = async (layer) => {
	const channel = await settings.get(`cgtServer.Channel`);
	const { error, request } = CG.cgStop({
		channel,
		layer,
		cgLayer: 1
	});

	if (error) {
		log.error('Error sending cgStop', error);
	} else {
		await request;
		log.debug(`Stopped Layer ${layer}`);
	}
};

// Auto-Update Layer (stop, update, play)
const cgUpdate = async (slot, auto, templateData, timeout) => {
	const templateSettings = await settings.get(`cgtTemplate.${slot}`);
	const { layer } = templateSettings;

	log.debug(`Auto-Update Layer ${layer} with Timeout ${timeout}ms.`);
	// Stop running Template
	await cgStop(layer);
	// Wait for timeout Duration and restart with new Data
	setTimeout(async () => {
		await cgPlay(slot, auto, templateData);
	}, timeout);
};

// Clear CG Leyer
const cgClear = async (layer) => {
	const channel = await settings.get(`cgtServer.Channel`);
	const { error, request } = CG.cgClear({
		channel,
		layer
	});

	if (error) {
		log.error('Error sending cgClear', error);
	} else {
		await request;
		log.debug(`Cleared Layer ${layer}`);
	}
};

// Clear CG Channel
const cgClearAll = async () => {
	const channel = await settings.get(`cgtServer.Channel`);
	const { error, request } = CG.clear({ channel });

	if (error) {
		log.error('Error sending cgClearAll', error);
	} else {
		await request;
		log.debug(`Cleared Channel.`);
	}
};

module.exports.getCGConnection = getCGConnection;
module.exports.getLayerFromSlot = getLayerFromSlot;
module.exports.cgPlay = cgPlay;
module.exports.cgStop = cgStop;
module.exports.cgUpdate = cgUpdate;
module.exports.cgClear = cgClear;
module.exports.cgClearAll = cgClearAll;
