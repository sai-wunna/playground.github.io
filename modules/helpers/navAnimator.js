import { getNode } from '../dom/dom.js'

function openNav(wrapper, classList) {
  getNode('.priority-wrapper-box')?.classList.remove('priority-wrapper-box')
  wrapper.style.display = 'block'
  let timerId = setTimeout(() => {
    wrapper.classList.add(classList)
    wrapper.classList.add('priority-wrapper-box')
  }, 10)
  return () => clearTimeout(timerId)
}

function closeNav(wrapper, classList) {
  wrapper.classList.remove('priority-wrapper-box')
  wrapper.classList.remove(classList)
  let timerId = setTimeout(() => {
    wrapper.style.display = 'none'
  }, 400)
  return () => clearTimeout(timerId)
}

export { openNav, closeNav }
