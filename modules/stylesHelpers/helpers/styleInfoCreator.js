import { createButton, createElement, createSpan } from '../../dom/dom.js'

function createStyleInfo(sType, group, node, key, value, fn) {
  return createElement(
    'div',
    '',
    ['my-1', 'style-info'],
    [
      createSpan(`${key.trim()} : `, ['text-muted', 'mx-1', 'css-key']),
      createSpan(
        value,
        ['mx-1', 'css-value'],
        `${sType}_${group}_${key.trim()}_value`
      ),
      createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        (e) => {
          e.target.parentElement.remove()
          fn(group, node, key)
        }
      ),
    ]
  )
}

export { createStyleInfo }
