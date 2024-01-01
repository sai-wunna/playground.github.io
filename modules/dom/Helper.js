class Helper {
  manageInputEle(ip, tp, opt = {}) {
    // button + checkbox + color + date + datetime-local + email + file + hidden + image + month
    // number + password + radio + range + reset + search + submit + tel + text + time + url + week
    try {
      if (opt.value) {
        ip.value = opt.value
      } else if (tp === 'submit') {
        ip.value = 'submit'
      }
      if (opt.checked !== undefined && ['checkbox', 'radio'].includes(tp)) {
        ip.checked = opt.checked
      }
      if (opt.min !== undefined) {
        if (tp === 'text') {
          ip.minLength = opt.min
        } else {
          ip.min = opt.min
        }
      }
      if (opt.max !== undefined) {
        if (tp === 'text') {
          ip.maxLength = opt.max
        } else {
          ip.max = opt.max
        }
      }
      if (opt.name) {
        ip.name = opt.name
      }
      if (opt.title) {
        ip.title = opt.title
      }
      if (opt.required !== undefined) {
        ip.required = opt.required
      }
      if (opt.placeholder) {
        ip.placeholder = opt.placeholder
      }
      if (opt.disabled) {
        ip.disabled = opt.disabled
      }
      if (opt.step !== undefined) {
        ip.step = opt.step
      }
      if (opt.accept) {
        ip.accept = opt.accept
      }
      if (opt.alt) {
        ip.alt = opt.alt
      }
      if (opt.src) {
        ip.src = opt.src
      }
      if (opt.required) {
        ip.required = opt.required
      }
      if (opt.pattern) {
        ip.pattern = opt.pattern
      }
    } catch (error) {}
  }
}

export default Helper
