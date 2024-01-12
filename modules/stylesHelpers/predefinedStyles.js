import Document from '../dom/index.js'

const _ = Document()

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
  const appliedStyle = _.getNodeById(`${ele}_${condition}_${key.trim()}_value`)
  if (appliedStyle) {
    appliedStyle.textContent = value
  } else {
    const conditionBox = _.getNode(`.pred-styles-${condition}-info`)
    const styleInfo = createPredStyleInfo(ele, condition, key, value)
    if (conditionBox) {
      conditionBox.appendChild(styleInfo)
    } else {
      const newConditionBox = createConditionBox(ele, condition, {
        [`${key}`]: value,
      })
      _.getNode('.predefined-styles-info').appendChild(newConditionBox)
    }
  }
  savePredefinedStyles(ele, condition, key, value)
}

function createConditionBox(ele, condition, styles) {
  const fragment = _.createFragment()
  for (let key in styles) {
    fragment.appendChild(createPredStyleInfo(ele, condition, key, styles[key]))
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
    const box = createConditionBox(ele, condition, cStyles)
    stylesFrags.appendChild(box)
  }
  return stylesFrags
}

function createPredStyleInfo(ele, condition, key, value) {
  return _.createElement(
    '',
    '',
    ['my-1', 'style-info'],
    [
      _.createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      _.createSpan(
        value,
        ['mx-1', 'css-value'],
        `${ele}_${condition}_${key.trim()}_value`
      ),
      _.createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        (e) => {
          e.target.parentElement.remove()
          removePredefinedStyle(ele, condition, key)
        }
      ),
    ]
  )
}

export {
  predefinedStyles,
  createPredStyleInfoFrag,
  savePredefinedStyles,
  changePredStyle,
}
