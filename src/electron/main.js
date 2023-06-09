// eslint-disable-next-line no-unused-vars
const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
const log = require('electron-log');
const { is } = require('electron-util');
const settings = require('./lib/settings');
const CG = require('./lib/casparcg');
const {
	getCGConnection,
	getLayerFromSlot,
	cgPlay,
	cgStop,
	cgUpdate,
	cgClear,
	cgClearAll
} = require('./lib/cg-helpers');
const { getCSV } = require('./lib/csv');

let mainWindow;

// Main Window Function
function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'naheTV DM CasparCG Client',
		width: is.development ? 1500 : 1200,
		height: is.development ? 840 : 820,
		show: false,
		backgroundColor: 'gray',
		autoHideMenuBar: is.development ? false : true,
		icon: path.join(__dirname, 'icon.ico'),
		// autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		// Open DevTools in Dev Mode
		if (is.development) {
			mainWindow.webContents.openDevTools();
		}
	});
}

// Hot Reload in Dev
if (is.development) {
	require('electron-reloader')(module);
	log.info('App running in Dev mode.');
}

// ----- Run on App Start ----- //

app.whenReady().then(() => {
	createMainWindow();
	log.info('App loaded.');

	// OSX Window Recreation on Activate
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});

	// Connect to CasparCG with slight delay
	setTimeout(() => {
		CG.connect();
		log.debug('CG-Connection initiated.');
	}, 2000);

	CG.on('connect', async () => {
		const connection = await getCGConnection();
		await mainWindow.webContents.send('status/CG', connection);
	});

	CG.on('disconnect', async () => {
		const connection = await getCGConnection();
		await mainWindow.webContents.send('status/CG', connection);
	});

	CG.on('error', (err) => {
		log.error(`CG-Server Error: ${err}`);
	});

	// Handle IPC Requests
	ipcMain.handle('get/APTime', async (event, args) => {
		const time = await settings.get(`cgtTemplate.${args}.defaultPlayTime`);
		return time;
	});

	ipcMain.handle('get/SelectOptions', async (event, args) => {
		const options = await settings.get(`cgtTemplate.${args}.selectOptions`);
		if (options) {
			// log.debug(options);
			return options;
		}
	});

	ipcMain.handle('get/CSVData', async () => {
		const results = await getCSV();
		return results;
	});

	ipcMain.handle('get/CGStatus', async () => {
		const connection = await getCGConnection();
		return connection;
	});

	ipcMain.on('CG/Play', (event, data) => {
		cgPlay(data.slot, data.auto, data.templateData, data.duration);
	});

	ipcMain.on('CG/Stop', async (event, data) => {
		const layer = await getLayerFromSlot(data);
		cgStop(layer);
	});

	ipcMain.on('CG/Update', async (event, data) => {
		cgUpdate(data.slot, data.auto, data.templateData, data.timeout);
	});

	ipcMain.on('CG/Clear', async (event, data) => {
		const layer = await getLayerFromSlot(data);
		cgClear(layer);
	});

	ipcMain.on('CG/ClearAll', async () => {
		cgClearAll();
	});
});

// Close App (with MacOS exeption)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		// CG.disconnect();
		app.quit();
	}
});

app.allowRendererProcessReuse = true;
