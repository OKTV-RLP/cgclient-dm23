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
const cgPlay = async (slot, auto, templateData, apDuration) => {
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
		channel: 1,
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
	const { error, request } = CG.cgStop({
		channel: 1,
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

module.exports.getCGConnection = getCGConnection;
module.exports.getLayerFromSlot = getLayerFromSlot;
module.exports.cgPlay = cgPlay;
module.exports.cgStop = cgStop;
