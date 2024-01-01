import Document from '../dom/index.js'
const _ = Document()

function openNav(wrapper, classList) {
  _.getNode('.priority-wrapper-box')?.classList.remove('priority-wrapper-box')
  wrapper.classList.add(classList)
  wrapper.classList.add('priority-wrapper-box')

  return () => clearTimeout(timerId)
}

function closeNav(wrapper, classList) {
  wrapper.classList.remove(classList)
  return () => clearTimeout(timerId)
}

export { openNav, closeNav }
