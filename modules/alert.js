import Document from './dom/index.js'
const _ = Document()

class Alert {
  #alertMessages = {}
  #countLimit
  #currentCount = 0

  constructor(
    messages = {
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
    },
    countLimit = 3
  ) {
    this.#alertMessages = messages
    this.#countLimit = countLimit
  }

  alertMe(type = 'invalid', period = 3000) {
    if (this.#currentCount > this.#countLimit) return
    this.#currentCount += 1
    const alertBox = _.createElement('div', this.#alertMessages[type], [
      'custom-alert-box',
    ])
    _.getNode('#wrapper').appendChild(alertBox)
    let dropTimer = setTimeout(() => {
      alertBox.style.top = `${(this.#currentCount - 1) * 40}px`
    }, 10)
    let hideTimer = setTimeout(() => {
      alertBox.style.top = '-10%'
    }, period)
    let removeTimer = setTimeout(() => {
      this.#currentCount -= 1
      alertBox.remove()
    }, period + 500)
    return () => {
      clearTimeout(dropTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
    }
  }

  addMessages(messages = {}) {
    this.#alertMessages = { ...this.#alertMessages, ...messages }
  }
}

export default (countLimit) => new Alert(countLimit)
