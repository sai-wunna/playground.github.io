'use strict'

import _ from '../dom/index.js'

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
      existedBox.appendChild(createStyleInfo(media, condition, key, value))
    } else {
      _.getNode(`.${media}-screen-styles`).appendChild(
        createConditionBox(
          media,
          condition,
          createStyleInfo(media, condition, key, value)
        )
      )
    }
  }
}

function removeConditionStyles(node, media, condition) {
  customStyles[node][media][condition] = {}
}

function removeCusStyleValue(node, media, condition, key) {
  delete customStyles[node][media][condition][key]
}

function removeRelevantCusStyles(removedNode) {
  const ids = [removedNode.id]
  function observeIds(node) {
    for (const child of node.children) {
      ids.push(child.id)
      observeIds(child)
    }
  }
  observeIds(removedNode)
  ids.forEach((id) => delete customStyles[id])
}

function createStyleInfo(media, condition, key, value) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${media}-${condition}-${key}`
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
      delBtn,
    ]
  )
}

function createConditionBox(media, condition, styleInfoFragment) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${media}-${condition}-`
  return _.createElement(
    '',
    '',
    [`${media}-${condition}-styles`],
    [
      delBtn,
      _.createElement('', condition, ['style-type-label']),
      styleInfoFragment,
    ]
  )
}
// listen all event here
function createListenerWrapper(node) {
  const wrapper = _.createElement('', '', ['style-info-listener-wrapper'], [])
  wrapper.addEventListener('click', handleClick)
  function handleClick(e) {
    e.stopPropagation()
    if (e.target.type !== 'button') return
    e.target.parentElement.remove()
    const [media, condition, key] = e.target.dataset.props.split('-')
    if (!key) {
      removeConditionStyles(node, media, condition)
      return
    }
    removeCusStyleValue(node, media, condition, key)
  }
  return [wrapper, () => wrapper.removeEventListener('click', handleClick)]
}

function createCusStyleInfoShower(node) {
  const customStyle = customStyles[node]
  const [listenerWrapper, listenerEvtCleaner] = createListenerWrapper(node)

  if (!customStyle) {
    listenerWrapper.appendChild(
      _.createFragment([
        ...mediaTypes.map((media) =>
          _.createElement(
            '',
            '',
            [`${media}-screen-styles`],
            [_.createHeading('h6', `${media} Screen`)]
          )
        ),
      ])
    )
    return [listenerWrapper, listenerEvtCleaner]
  }

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
          createStyleInfo(media, condition, key, value)
        )
      }
      mediaStyleBox.appendChild(
        createConditionBox(media, condition, conditionStyleFrag)
      )
    }

    listenerWrapper.appendChild(mediaStyleBox)
  })

  return [listenerWrapper, listenerEvtCleaner]
}

export {
  customStyles,
  saveCusStyle,
  createCusStyleInfoShower,
  insertCustomStyles,
  removeRelevantCusStyles,
}
