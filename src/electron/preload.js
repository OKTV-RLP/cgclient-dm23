const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API = {
	getAPTime: async (template) => {
		return await ipcRenderer.invoke('get/APTime', template);
	},
	onStatusCG: (callback) => {
		ipcRenderer.on('status/CG', callback);
	}
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
