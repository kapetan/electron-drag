# electron-drag

Improved window dragging for `Electron` applications.

Frameless windows can be dragged using the [-webkit-app-region][region] css property, but this disables all regular dom events and user interactions with the affected element, which makes it hard to emulate a native-like title bar in the application, as it's not possible to capture double clicks for maximizing the window.

A workaround is to use a pure javascript solution, but dragging only works well when moving the mouse in less than normal speed, else the mouse pointer will move outside the window area and no events will be received by the dom.

This module uses [osx-mouse][osx] or [win-mouse][win] modules for tracking the mouse position on the entire screen, and thereby enabling consistent window dragging, while the affected element is still able to receive dom events.

# Usage

	npm install electron-drag

Require the module in an `Electron` web page.

```javascript
var drag = require('electron-drag');

// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
var clear = drag('#element');

// Call the returned function to make the element undraggable again.
clear();
```

The module only works on OS X and Windows, but doesn't fail when installed on a non-supported platform.

```javascript
// Fallback to using -webkit-app-region property.
if(!drag.supported) {
	document.querySelector('#element').style['-webkit-app-region'] = 'drag';
}
```

The module needs to be built with the correct `Electron` headers. See the [guide for using native Node modules with Electron][native] for more information.

[region]: https://github.com/atom/electron/blob/master/docs/api/frameless-window.md#draggable-region
[osx]: https://github.com/kapetan/osx-mouse
[win]: https://github.com/kapetan/win-mouse
[native]: https://github.com/atom/electron/blob/master/docs/tutorial/using-native-node-modules.md
