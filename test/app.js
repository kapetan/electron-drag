var path = require('path');
var electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var window;

app.on('ready', function() {
	window = new BrowserWindow({ width: 800, height: 600, frame: false });
	var url = 'file://' + path.join(__dirname, 'index.html');

	window.loadURL(url);
});
