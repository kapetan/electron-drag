var path = require('path');
var app = require('app');
var BrowserWindow = require('browser-window');

var window;

app.on('ready', function() {
	window = new BrowserWindow({ width: 800, height: 600, frame: false });
	var url = 'file://' + path.join(__dirname, 'index.html');

	window.loadUrl(url);
});
