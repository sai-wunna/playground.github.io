'use strict'

import dom from '../dom/index.js'
const _ = dom()

function openNav(wp, classList) {
  _.getNode('.priority-wrapper-box')?.classList.remove('priority-wrapper-box')
  wp.classList.add(classList)
  wp.classList.add('priority-wrapper-box')

  return () => clearTimeout(timerId)
}

function closeNav(wp, classList) {
  wp.classList.remove(classList)
  return () => clearTimeout(timerId)
}

export { openNav, closeNav }
