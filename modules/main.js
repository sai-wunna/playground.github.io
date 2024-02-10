'use strict'
import notifier from './notify.js'
import _ from './dom/index.js'
;(async () => {
  notifier.__start('Loading - 0')
  const cef = await import('./createElements.js')
  notifier.__processing('Loading - 25')
  const editors = await import('./editElements.js')
  notifier.__processing('Loading - 50')
  const navigators = await import('./nav.js')
  notifier.__processing('Loading - 75')
  const stylers = await import('./stylers.js')
  console.log(stylers.default)
  console.log(editors.default)
  console.log(cef.default)
  console.log(navigators.default)
  notifier.__end('Ready to go')
})()

console.log('%cHello World', 'color: blue; font-size: 32px;')

// _.on('beforeunload', window, (e) => {
//   e.preventDefault()
//   e.returnValue = true
// })
