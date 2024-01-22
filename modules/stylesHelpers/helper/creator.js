'use strict'

import Document from '../../dom/index.js'

const _ = Document()

function createUnitSelector() {
  const units = [
    { value: 'px', text: 'px' },
    { value: '%', text: '%' },
    { value: 'em', text: 'em' },
    { value: 'rem', text: 'rem' },
    { value: 'vh', text: 'vh' },
    { value: 'vw', text: 'vw' },
    { value: 'vmin', text: 'vmin' },
    { value: 'vmax', text: 'vmax' },
    { value: 'fr', text: 'fr' },
    { value: 'cm', text: 'cm' },
    { value: 'mm', text: 'mm' },
    { value: 'in', text: 'in' },
    { value: 'pt', text: 'pt' },
    { value: 'pc', text: 'pc' },
    { value: 'ex', text: 'ex' },
    { value: 'ch', text: 'ch' },
  ]

  const unitSelector = _.createSelect(['cs-select', 'unit-selector'], '', [
    ...units,
  ])

  return unitSelector
}

function removeParentBtn() {
  return _.createButton('Del', ['inline-btn', 'text-danger'], '', (e) =>
    e.target.parentElement.remove()
  )
}

const unitOne = createUnitSelector()
const unitTwo = createUnitSelector()
const unitThree = createUnitSelector()
const unitFour = createUnitSelector()
const unitSelectors = _.createElement(
  '',
  '',
  ['cs-ip-gp', 'unit-selector-box'],
  [unitOne, unitTwo, unitThree, unitFour]
)

export { unitFour, unitOne, unitSelectors, unitThree, unitTwo, removeParentBtn }
