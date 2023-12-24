import {
  createButton,
  createElement,
  createLabel,
  createSelect,
} from '../../dom/dom.js'

function createUnitSelector(...units) {
  const options = []
  for (let i = 0; i < units.length; i++) {
    options.push({ value: units[i], text: units[i] })
  }
  const unitLb = createLabel('Unit', 'unit_selector', ['cs-label'])
  const unitSelector = createSelect(
    ['cs-select'],
    '',
    [...options],
    'unit_selector'
  )
  return createElement('div', '', ['cs-ip-gp'], [unitLb, unitSelector])
}

function removeParentBtn() {
  return createButton('Del', ['inline-btn', 'text-danger'], '', (e) =>
    e.target.parentElement.remove()
  )
}

export { createUnitSelector, removeParentBtn }
