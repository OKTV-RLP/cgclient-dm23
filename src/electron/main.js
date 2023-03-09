const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
// const log = require('electron-log');
// const CG = require('./import/casparcg');

// Electron Live Reloader for Development
// try {
//     require('electron-reloader')(module);
// } catch {}

let win = null;

// settings.set('cgServer', {
//     IP: '127.0.0.1',
//     ACMP_Port: 5250,
//     OSC_Port: 8888,
//     Queue: 1,
// });

// Main Window Function
function createMainWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: true,
        },
    });

    win.loadFile(path.join(__dirname, '../../public/index.html'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('ready', () => {
    // Connect to CG-Server
    // CG.connect();
    // log.info('App ready');
});

// Close App (with MacOS exeption)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // CG.disconnect();
        app.quit();
    }
});

// Handle IPC Requests

ipcMain.handle('getAPTime', (event, args) => {
    console.log(args);
    const value = 7;
    return value;
});
