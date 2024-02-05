'use strict'

import dom from '../dom/index.js'

const _ = dom()

// name : { '0' : { color : 'red' }, '100' : { color : 'black' }}
const animations = {}

function insertAnimation(data) {
  for (const key in animations) {
    delete animations[key]
  }
  for (const [k, v] of Object.entries(data)) {
    animations[k] = v
  }
}

function addNewAnimation(name) {
  animations[name] = {}
}

function saveAnimationsStyle(name, kfSelector, key, value) {
  if (animations[name][kfSelector]) {
    if (animations[name][kfSelector][key]) {
      _.getNodeById(`ani_${kfSelector}_${key}_value`).textContent = value
    } else {
      _.getNode(`.kfs-${kfSelector}`).appendChild(
        createAnimationInfo(kfSelector, key, value)
      )
    }
    animations[name][kfSelector][key] = value
  } else {
    animations[name][kfSelector] = { [`${key}`]: value }
    _.getNode('.style-info-listener-wrapper').appendChild(
      createNewAnimationKFSBox(kfSelector, key, value)
    )
  }
}

function removeAnimationKFS(name, kfSelector) {
  delete animations[name][kfSelector]
}

function removeAnimationStyle(name, kfSelector, key) {
  delete animations[name][kfSelector][key]
}

function deleteAnimation(name) {
  delete animations[name]
}

function createListenerWrapper(name) {
  const wrapper = _.createElement('', '', ['style-info-listener-wrapper'], [])
  wrapper.addEventListener('click', handleClick)
  function handleClick(e) {
    e.stopPropagation()
    if (e.target.type !== 'button') return
    e.target.parentElement.remove()
    const [kfs, key] = e.target.dataset.props.split('-')
    if (!key) {
      removeAnimationKFS(name, parseInt(kfs))
      return
    }
    removeAnimationStyle(name, parseInt(kfs), key)
  }
  return [wrapper, () => wrapper.removeEventListener('click', handleClick)]
}

function createAnimationInfoShower(name) {
  const [wrapper, wrapperEvtCleaner] = createListenerWrapper(name)
  wrapper.appendChild(createAnimationInfoFrag(name))
  return [wrapper, wrapperEvtCleaner]
}

function createAnimationInfoFrag(name) {
  const fragment = _.createFragment()
  const animation = animations[name]
  if (!animation) {
    return fragment
  }
  for (const [keyFrame, kfStyles] of Object.entries(animation)) {
    const delBtn = _.createButton('Del', [
      'inline-btn',
      'float-end',
      'text-danger',
    ])
    delBtn.dataset.props = `${keyFrame}-`
    const kfsBox = _.createElement(
      'div',
      '',
      ['animation-kfs-box', `kfs-${keyFrame}`],
      [_.createSpan(`At ${keyFrame}%`, '', ['cs-kfs-label']), delBtn]
    )
    for (const [key, value] of Object.entries(kfStyles)) {
      kfsBox.appendChild(createAnimationInfo(keyFrame, key, value))
    }
    fragment.appendChild(kfsBox)
  }
  return fragment
}

function createAnimationInfo(kfs, key, value) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${kfs}-${key}`
  return _.createElement(
    'div',
    '',
    ['my-1', 'style-info'],
    [
      _.createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      _.createSpan(
        value,
        ['mx-1', 'css-value'],
        `ani_${kfs}_${key.trim()}_value`
      ),
      delBtn,
    ]
  )
}

function createNewAnimationKFSBox(kfs, key, value) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'float-end',
    'text-danger',
  ])
  delBtn.dataset.props = `${kfs}-`
  return _.createElement(
    'div',
    '',
    ['animation-kfs-box', `kfs-${kfs}`],
    [
      _.createSpan(`At ${kfs}%`, '', ['cs-kfs-label']),
      delBtn,
      createAnimationInfo(kfs, key, value),
    ]
  )
}

export {
  animations,
  deleteAnimation,
  saveAnimationsStyle,
  addNewAnimation,
  createAnimationInfo,
  createAnimationInfoShower,
  insertAnimation,
  createAnimationInfoFrag,
}
