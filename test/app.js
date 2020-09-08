const path = require('path');
const { app, BrowserWindow } = require('electron');

app.whenReady().then(function () {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  window.loadFile(path.join(__dirname, 'index.html'));
  window.webContents.openDevTools();
});
