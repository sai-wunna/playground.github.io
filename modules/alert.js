import { createElement, getAllNodes, getNode } from './dom/dom.js'
const alertMessages = {
  invalid: 'Invalid Action',
  noSelectedAnimation: 'Please create new animation or select from List.',
  invalidInput: 'Invalid Input',
  unAppendAble: 'Cannot append to the target element',
  hidden: 'This element is currently out of sight',
  unWritable: 'Cannot write or add text to this element',
  unEditable: 'Cannot edit this element',
  noUpdate: 'Changes not found to update',
}

function alertMe(type = 'invalid', period = 3000) {
  const shownAlerts = getAllNodes('.custom-alert-box').length
  if (shownAlerts > 2) return
  const alertBox = createElement('div', alertMessages[type], [
    'custom-alert-box',
  ])
  getNode('#wrapper').appendChild(alertBox)
  let dropTimer = setTimeout(() => {
    alertBox.style.top = `${shownAlerts * 40}px`
  }, 10)
  let hideTimer = setTimeout(() => {
    alertBox.style.top = '-10%'
  }, period)
  let removeTimer = setTimeout(() => {
    alertBox.remove()
  }, period + 500)
  return () => {
    clearTimeout(dropTimer)
    clearTimeout(hideTimer)
    clearTimeout(removeTimer)
  }
}

export { alertMe }
