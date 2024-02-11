'use strict'

import _ from '../dom/index.js'

const predefinedStyles = {
  all: {},
  button: {},
  link: {},
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
  block: {},
  image: {},
  paragraph: {},
  list: {},
  table: {},
  selection: {},
  span: {},
  figure: {},
  hr: {},
}

function insertPredefinedStyles(data) {
  for (const key in predefinedStyles) {
    delete predefinedStyles[key]
  }
  for (const [k, v] of Object.entries(data)) {
    predefinedStyles[k] = v
  }
}

function savePredefinedStyles(ele, condition, key, value) {
  if (predefinedStyles[ele][condition]) {
    predefinedStyles[ele][condition][key] = value
  } else {
    predefinedStyles[ele][condition] = { [`${key}`]: value }
  }
}

function removePredefinedStyle(ele, condition, key) {
  if (Object.keys(predefinedStyles[ele][condition]).length === 1) {
    delete predefinedStyles[ele][condition]
  } else {
    delete predefinedStyles[ele][condition][key]
  }
}

// data manipulation done

function changePredStyle(ele, condition, key, value) {
  const appliedStyle = _.getNodeById(`${condition}_${key.trim()}_value`)
  if (appliedStyle) {
    appliedStyle.textContent = value
  } else {
    const conditionBox = _.getNode(`.pred-styles-${condition}-info`)
    const styleInfo = createPredStyleInfo(condition, key, value)
    if (conditionBox) {
      conditionBox.appendChild(styleInfo)
    } else {
      const newConditionBox = createConditionBox(condition, {
        [`${key}`]: value,
      })
      _.getNode('.style-info-listener-wrapper').appendChild(newConditionBox)
    }
  }
  savePredefinedStyles(ele, condition, key, value)
}

function createConditionBox(condition, styles) {
  const fragment = _.createFragment()
  for (let [key, value] of Object.entries(styles)) {
    fragment.appendChild(createPredStyleInfo(condition, key, value))
  }
  return _.createElement(
    '',
    '',
    [`pred-styles-${condition}-box`],
    [
      _.createElement('', condition, ['style-type-label']),
      _.createElement('', '', [`pred-styles-${condition}-info`], [fragment]),
    ]
  )
}

function createPredStyleInfoFrag(ele) {
  const styles = predefinedStyles[ele]
  const stylesFrags = _.createFragment()

  for (let [condition, cStyles] of Object.entries(styles)) {
    const box = createConditionBox(condition, cStyles)
    stylesFrags.appendChild(box)
  }
  return stylesFrags
}

function createPredStyleInfo(condition, key, value) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${condition}_${key}`
  return _.createElement(
    '',
    '',
    ['my-1', 'style-info'],
    [
      _.createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      _.createSpan(
        value,
        ['mx-1', 'css-value'],
        `${condition}_${key.trim()}_value`
      ),
      delBtn,
    ]
  )
}
// listen all event here
function createListenerWrapper(ele) {
  const wrapper = _.createElement('', '', ['style-info-listener-wrapper'], [])
  wrapper.addEventListener('click', handleClick)
  function handleClick(e) {
    e.stopPropagation()
    if (e.target.type !== 'button') return
    e.target.parentElement.remove()
    const [condition, key] = e.target.dataset.props.split('_')
    removePredefinedStyle(ele, condition, key)
  }
  return [wrapper, () => wrapper.removeEventListener('click', handleClick)]
}

function createPredStyleInfoShower(ele) {
  const [wrapper, wrapperCleaner] = createListenerWrapper(ele)
  wrapper.appendChild(createPredStyleInfoFrag(ele))
  return [wrapper, wrapperCleaner]
}

export {
  predefinedStyles,
  createPredStyleInfoFrag,
  savePredefinedStyles,
  changePredStyle,
  insertPredefinedStyles,
  createPredStyleInfoShower,
}
