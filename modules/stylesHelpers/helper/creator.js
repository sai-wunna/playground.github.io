import Document from '../../dom/index.js'

const _ = Document()

function createUnitSelector() {
  const units = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax']
  const unitLb = _.createLabel('Unit', 'unit_selector', ['cs-label'])
  const unitSelector = _.createSelect(['cs-select'], '', [], 'unit_selector')

  for (let i = 0; i < units.length; i++) {
    const key = units[i]
    _.createOption(unitSelector, key, key)
  }
  return _.createElement('div', '', ['cs-ip-gp'], [unitLb, unitSelector])
}

function removeParentBtn() {
  return _.createButton('Del', ['inline-btn', 'text-danger'], '', (e) =>
    e.target.parentElement.remove()
  )
}

export { createUnitSelector, removeParentBtn }
