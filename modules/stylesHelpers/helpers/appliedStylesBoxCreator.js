import { createElement, createFragment, createHeading } from '../../dom/dom.js'
import { createStyleInfo } from './styleInfoCreator.js'

const conditions = ['standard', 'hover', 'active', 'focus']

function createAppliedStyleBox(
  screen,
  appliedNode,
  styles = { standard: {}, hover: {}, active: {}, focus: {} },
  fn
) {
  const fragment = createFragment()
  const box = createElement('div', '', [`${screen}-screen`])
  fragment.appendChild(createHeading('h6', `${screen} screen size`))
  conditions.forEach((condition) => {
    box.appendChild(
      createInnerBox(appliedNode, screen, condition, styles[condition], fn)
    )
  })
  fragment.appendChild(box)
  return fragment
}

function createInnerBox(appliedNode, screen, condition, styles, fn) {
  const fragment = createFragment()
  let sType
  switch (screen) {
    case 'general':
      sType = 'grl'
      break
    case 'medium':
      sType = 'md'
      break
    default:
      sType = 'lg'
      break
  }
  if (Object.keys(styles).length > 0) {
    for (let key in styles) {
      fragment.appendChild(
        createStyleInfo(sType, condition, appliedNode, key, styles[key], fn)
      )
    }
  }

  return createElement(
    'div',
    '',
    [`${screen}-screen-${condition}`],
    [
      createElement('div', `${condition} -`, ['style-type-label']),
      createElement(
        'div',
        '',
        [`${screen}-screen-${condition}-styles`],
        [fragment]
      ),
    ]
  )
}

export { createAppliedStyleBox }
