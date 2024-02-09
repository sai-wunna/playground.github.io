'use strict'

import _ from './dom/index.js'

class Notify {
  #alertMessages = {
    invalid: 'Invalid Action',
    noSelectedAnimation: 'Please create new animation or select from List.',
    existedAnimation: 'This Animation has already been created',
    noSelectedCN: 'Please create new className or select from list',
    invalidCN: 'No Class-name found to style',
    noAvailableCN: 'No Class-name has been created',
    existedCN: 'This Class-name has already been created',
    invalidInput: 'Invalid Input',
    unAppendAble: 'Cannot append to the target element',
    hidden: 'This element is currently out of sight',
    unWritable: 'Cannot write or add text to this element',
    unEditable: 'Cannot edit this element',
    noUpdate: 'No new added styles found to update',
    fileOnly: 'Please drop valid .json file',
    notJson: 'Invalid file type, must be type of .json',
    invalidFile: 'This file does not meet the requirement',
    fileInsertCaution: '* Setting up Invalid file will lead to errors *',
  }
  #countLimit
  #currentCount = 0
  #progressLoader

  constructor(doc, countLimit = 3) {
    this._ = doc
    this.#countLimit = countLimit
    this.#progressLoader = this._.createElement(
      'div',
      '',
      ['progress-alert'],
      []
    )
  }

  on(type = 'invalid', period = 3000) {
    if (this.#currentCount >= this.#countLimit) return
    this.#currentCount += 1
    const alertBox = this._.createElement('div', this.#alertMessages[type], [
      'custom-alert-box',
    ])
    _.appendChild(alertBox)
    let dropTimer = setTimeout(() => {
      alertBox.style.transform = `translate(-50%, ${
        (this.#currentCount - 1) * 110 + 20
      }%)`
    }, 10)
    let hideTimer = setTimeout(() => {
      alertBox.style.transform = 'translate(-50%, -100%)'
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

  __start(msg = 'Loading') {
    this.#progressLoader.textContent = msg
    _.appendChild(this.#progressLoader)
  }

  __end(msg = 'Ready') {
    this.#progressLoader.textContent = msg
    let timerId = setTimeout(() => {
      this.#progressLoader.remove()
    }, 2000)
    return () => clearTimeout(timerId)
  }

  addMessages(messages = {}) {
    this.#alertMessages = { ...this.#alertMessages, ...messages }
  }
}

export default new Notify(_)
