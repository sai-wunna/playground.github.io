function lockBtn(btn, delay = 500) {
  btn.disabled = true
  let timerId = setTimeout(() => {
    btn.disabled = false
  }, delay)
  return () => clearTimeout(timerId)
}

export { lockBtn }
