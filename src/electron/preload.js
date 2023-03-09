const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getAPTime: async (template) => {
        return await ipcRenderer.invoke('getAPTime', template);
    },
});
