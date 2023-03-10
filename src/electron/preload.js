const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API = {
	getAPTime: async (template) => {
		return await ipcRenderer.invoke('get/APTime', template);
	},
	getCGStatus: async () => {
		return await ipcRenderer.invoke('get/CGStatus');
	},
	playCG: (data) => {
		console.log(data);
		ipcRenderer.send('CG/Play', data);
	},
	stopCG: (data) => {
		ipcRenderer.send('CG/Stop', data);
	},
	onStatusCG: (callback) => {
		ipcRenderer.on('status/CG', callback);
	}
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
