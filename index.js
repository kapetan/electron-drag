var tryRequire = require('try-require')
const $ = require('dombo')

const electron = tryRequire('electron')
const remote = electron ? electron.remote : tryRequire('remote')

const mouseConstructor = tryRequire('osx-mouse') || tryRequire('win-mouse')

const supported = !!mouseConstructor
const noop = function () { return noop }

const drag = function (element) {
  element = $(element)
  if (!element) return

  let offset = null
  let mouse = null

  const onmousedown = function (e) {
    offset = [e.clientX, e.clientY]
    mouse = mouseConstructor()
    mouse.on('left-drag', function (x, y) {
      if (!offset) return

      x = Math.round(x - offset[0])
      y = Math.round(y - offset[1])

      // setPosition throws error if called with -0
      remote.getCurrentWindow().setPosition(x + 0, y + 0)
    })

    mouse.on('left-up', function () {
      offset = null
    })
  }

  const destroyMouse = () => {
    mouse?.destroy()
    mouse = undefined
  }

  element.on('mousedown', onmousedown)
  element.on('mouseup', destroyMouse)

  return function () {
    element.off('mousedown', onmousedown)
    element.off('onmouseup', destroyMouse)
    destroyMouse()
  }
}

drag.supported = supported
module.exports = supported ? drag : noop
    
