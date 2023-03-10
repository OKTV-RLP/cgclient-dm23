// eslint-disable-next-line no-unused-vars
const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
const log = require('electron-log');
const { is } = require('electron-util');
const settings = require('./lib/settings');
const CG = require('./lib/casparcg');

let mainWindow;

// Main Window Function
function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'naheTV DM CasparCG Client',
		width: is.development ? 1500 : 1200,
		height: 720,
		show: false,
		backgroundColor: 'gray',
		autoHideMenuBar: is.development ? false : true,
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

	CG.on('connect', () => {
		log.info(`CG-Server connected on ${CG.host}:${CG.port}`);
		mainWindow.webContents.send('status/CG', { status: true, host: CG.host, port: CG.port });
	});

	CG.on('disconnect', () => {
		log.info(`CG-Server disconnected from ${CG.host}:${CG.port}`);
		mainWindow.webContents.send('status/CG', { status: false, host: CG.host, port: CG.port });
	});

	CG.on('error', (err) => {
		log.error(`CG-Server Error: ${err}`);
	});

	// Handle IPC Requests
	ipcMain.handle('get/APTime', async (event, args) => {
		const time = await settings.get(`cgtTemplate.${args}.defaultPlayTime`);
		return time;
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
