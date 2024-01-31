'use strict'

import dom from '../dom/index.js'
const _ = dom()

// { #div_232334 : { general : { standard : { color : red } , hover : { color : 'silver'}} , medium : { standard : { color : 'blue'}}} }
const customStyles = {}

const mediaTypes = ['general', 'medium', 'large']

function insertCustomStyles(data) {
  for (const key in customStyles) {
    delete customStyles[key]
  }
  for (const [k, v] of Object.entries(data)) {
    customStyles[k] = v
  }
}

function saveCusStyle(node, media, condition, key, value) {
  if (!customStyles[node]) {
    customStyles[node] = {
      general: { standard: {}, hover: {}, active: {}, focus: {} },
      medium: { standard: {}, hover: {}, active: {}, focus: {} },
      large: { standard: {}, hover: {}, active: {}, focus: {} },
    }
  }
  customStyles[node][media][condition][key] = value
  // push to doc
  const existedNode = _.getNodeById(`${media}_${condition}_${key}_value`)
  if (existedNode) {
    existedNode.textContent = value
  } else {
    const existedBox = _.getNode(`.${media}-${condition}-styles`)
    if (existedBox) {
      existedBox.appendChild(
        createStyleInfo(node, media, condition, key, value)
      )
    } else {
      _.getNode(`.${media}-screen-styles`).appendChild(
        createConditionBox(
          node,
          media,
          condition,
          createStyleInfo(node, media, condition, key, value)
        )
      )
    }
  }
}

function removeCusStyle(node) {
  delete customStyles[node]
}

function removeConditionStyles(node, media, condition) {
  customStyles[node][media][condition] = {}
}

function removeCusStyleValue(node, media, condition, key) {
  delete customStyles[node][media][condition][key]
}

function createStyleInfo(node, media, condition, key, value) {
  return _.createElement(
    '',
    '',
    ['my-1', 'style-info'],
    [
      _.createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      _.createSpan(
        value,
        ['mx-1', 'css-value'],
        `${media}_${condition}_${key.trim()}_value`
      ),
      _.createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        (e) => {
          e.target.parentElement.remove()
          removeCusStyleValue(node, media, condition, key)
        }
      ),
    ]
  )
}

function createConditionBox(node, media, condition, styleInfoFragment) {
  return _.createElement(
    '',
    '',
    [`${media}-${condition}-styles`],
    [
      _.createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        (e) => {
          e.target.parentElement.remove()
          removeConditionStyles(node, media, condition)
        }
      ),
      _.createElement('', condition, ['style-type-label']),
      styleInfoFragment,
    ]
  )
}

function createCusStyleInfoShower(node) {
  const customStyle = customStyles[node]

  if (!customStyle) {
    return _.createElement(
      '',
      '',
      ['applied-styles'],
      [
        ...mediaTypes.map((media) =>
          _.createElement(
            '',
            '',
            [`${media}-screen-styles`],
            [_.createHeading('h6', `${media} Screen`)]
          )
        ),
      ]
    )
  }

  const styleFragment = _.createFragment()

  mediaTypes.forEach((media) => {
    const mediaStyles = customStyle[media]
    const mediaStyleBox = _.createElement(
      '',
      '',
      [`${media}-screen-styles`],
      [_.createHeading('h6', `${media} Screen`)]
    )
    for (const [condition, conditionStyles] of Object.entries(mediaStyles)) {
      if (Object.keys(conditionStyles).length < 1) continue
      const conditionStyleFrag = _.createFragment()
      for (const [key, value] of Object.entries(conditionStyles)) {
        conditionStyleFrag.appendChild(
          createStyleInfo(customStyle, media, condition, key, value)
        )
      }
      mediaStyleBox.appendChild(
        createConditionBox(customStyle, media, condition, conditionStyleFrag)
      )
    }

    styleFragment.appendChild(mediaStyleBox)
  })

  return _.createElement('', '', ['applied-styles'], [styleFragment])
}

export {
  customStyles,
  saveCusStyle,
  removeCusStyle,
  createCusStyleInfoShower,
  insertCustomStyles,
}
