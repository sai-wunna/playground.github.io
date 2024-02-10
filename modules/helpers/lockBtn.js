'use strict'

function lockBtn(btn, delay = 500) {
  btn.disabled = true
  let timerId = setTimeout(() => {
    btn.disabled = false
    clearTimeout(timerId)
  }, delay)
}

export { lockBtn }
