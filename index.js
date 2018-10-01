var tryRequire = require('try-require');
var $ = require('dombo');

var electron = tryRequire('electron');
var remote = electron ? electron.remote : tryRequire('remote');

var mouseConstructor = tryRequire('osx-mouse') || tryRequire('win-mouse');

var supported = !!mouseConstructor;
var noop = function() {};

var drag = function(element) {
	element = $(element);

	var offset = null;
	var didDrag = false;
	var mouse = mouseConstructor();

	var onmousedown = function(e) {
		offset = [e.clientX, e.clientY];
	};

	var onclick = function(e) {
		if(didDrag) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		return;
	};

	element.on('mousedown', onmousedown);

	element.on('click', onclick);

	mouse.on('left-drag', function(x, y) {
		if(!offset) return;

		didDrag = true;

		x = Math.round(x - offset[0]);
		y = Math.round(y - offset[1]);

		remote.getCurrentWindow().setPosition(x, y);
	});

	mouse.on('left-up', function() {
		offset = null;
		window.setTimeout(function() {
			didDrag = false;
		}, 10);
	});

	return function() {
		element.off('mousedown', onmousedown);
		element.off('click', onclick);
		mouse.destroy();
	};
};

drag.supported = supported;
module.exports = supported ? drag : noop;
