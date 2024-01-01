import Document from './dom/index.js'

const _ = Document()

const alertMessages = {
  invalid: 'Invalid Action',
  noSelectedAnimation: 'Please create new animation or select from List.',
  noSelectedCN: 'Please create new className or select from list',
  noAvailableCN: 'No Class-name has been created',
  invalidInput: 'Invalid Input',
  unAppendAble: 'Cannot append to the target element',
  hidden: 'This element is currently out of sight',
  unWritable: 'Cannot write or add text to this element',
  unEditable: 'Cannot edit this element',
  noUpdate: 'Changes not found to update',
}

let countLimit = 0

function alertMe(type = 'invalid', period = 3000) {
  if (countLimit > 2) return
  countLimit += 1
  const alertBox = _.createElement('div', alertMessages[type], [
    'custom-alert-box',
  ])
  _.getNode('#wrapper').appendChild(alertBox)
  let dropTimer = setTimeout(() => {
    alertBox.style.top = `${(countLimit - 1) * 40}px`
  }, 10)
  let hideTimer = setTimeout(() => {
    alertBox.style.top = '-10%'
  }, period)
  let removeTimer = setTimeout(() => {
    countLimit -= 1
    alertBox.remove()
  }, period + 500)
  return () => {
    clearTimeout(dropTimer)
    clearTimeout(hideTimer)
    clearTimeout(removeTimer)
  }
}

export { alertMe }
