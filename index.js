var tryRequire = require('try-require');
var remote = require('remote');
var $ = require('dombo');

var mouseConstructor = tryRequire('osx-mouse') || tryRequire('win-mouse');

var supported = !!mouseConstructor;
var noop = function() {};

var drag = function(element) {
	element = $(element);

	var offset = null;
	var mouse = mouseConstructor();

	var onmousedown = function(e) {
		offset = [e.clientX, e.clientY];
	};

	element.on('mousedown', onmousedown);

	mouse.on('left-drag', function(x, y) {
		if(!offset) return;

		x = Math.round(x - offset[0]);
		y = Math.round(y - offset[1]);

		if(x < 0) x = 0;
		if(y < 0) y = 0;

		remote.getCurrentWindow().setPosition(x, y);
	});

	mouse.on('left-up', function() {
		offset = null;
	});

	return function() {
		element.off('mousedown', onmousedown);
		mouse.destroy();
	};
};

drag.supported = supported;
module.exports = supported ? drag : noop;
