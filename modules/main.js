'use strict'
import Alert from './alert.js'
import document from './dom/index.js'

const _ = document()
const alert = Alert(_)

;(async () => {
  alert.__start('Loading')
  const cef = await import('./createElements.js')
  const editors = await import('./editElements.js')
  const navigators = await import('./navs.js')
  const stylers = await import('./stylers.js')
  console.log(stylers.default)
  console.log(editors.default)
  console.log(cef.default)
  console.log(navigators.default)
  alert.__end('Ready to go')
})()

console.log('%cHello World', 'color: blue; font-size: 32px;')

// _.on('beforeunload', window, (e) => {
//   e.preventDefault()
//   e.returnValue = true
// })
// for production only
