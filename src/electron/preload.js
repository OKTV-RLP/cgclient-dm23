const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API = {
	getAPTime: async (template) => {
		return await ipcRenderer.invoke('get/APTime', template);
	},
	getSelectOptions: async (template) => {
		return await ipcRenderer.invoke('get/SelectOptions', template);
	},
	getCSV: async () => {
		return await ipcRenderer.invoke('get/CSVData');
	},
	getCGStatus: async () => {
		return await ipcRenderer.invoke('get/CGStatus');
	},
	playCG: (data) => {
		// console.log(data);
		ipcRenderer.send('CG/Play', data);
	},
	stopCG: (data) => {
		ipcRenderer.send('CG/Stop', data);
	},
	clearCG: (data) => {
		ipcRenderer.send('CG/Clear', data);
	},
	clearAllCG: () => {
		ipcRenderer.send('CG/ClearAll');
	},
	updateCG: (data) => {
		ipcRenderer.send('CG/Update', data);
	},
	onStatusCG: (callback) => {
		ipcRenderer.on('status/CG', callback);
	}
};

contextBridge.exposeInMainWorld('api', WINDOW_API);
