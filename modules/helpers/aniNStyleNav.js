import { getNode } from '../dom/dom.js'

function toggleAnimationBox(e) {
  if (e.target.classList.contains('animations-box-opened')) {
    e.target.classList.remove('animations-box-opened')
    getNode('.applied-styles').style.display = 'block'
    getNode('.animation-box').style.display = 'none'
    getNode('#styles_header').textContent = 'Applied Styles'
  } else {
    e.target.classList.add('animations-box-opened')
    getNode('#styles_header').textContent = 'Animations'
    getNode('.animation-box').style.display = 'block'
    getNode('.applied-styles').style.display = 'none'
  }
}

export { toggleAnimationBox }
