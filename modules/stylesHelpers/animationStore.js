import { alertMe } from '../alert.js'
import {
  createButton,
  createElement,
  createFragment,
  createInput,
  createLabel,
  createOption,
  createSelect,
  createSpan,
  getNode,
} from '../dom/dom.js'

// name : { '0' : { color : 'red' }, '100' : { color : 'black' }}
const animations = {}

function addNewAnimation(name) {
  let newName = name || `animation_${new Date().getTime()}`
  animations[newName] = {}
}

function saveAnimationsStyle(name, kfSelector, key, value) {
  if (animations[name][kfSelector]) {
    if (animations[name][kfSelector][key]) {
      getNode(`#ani_${key}_value`).textContent = value
    } else {
      getNode(`.kfs-${kfSelector}`).appendChild(
        createAnimationInfo(name, kfSelector, key, value)
      )
    }
    animations[name][kfSelector][key] = value
  } else {
    animations[name][kfSelector] = { [`${key}`]: value }
    getNode('.animation-info').appendChild(
      createAnimationKFSBox(name, kfSelector, key, value)
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

function createAnimationForm() {
  const addNewAnimationBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Animation name', 'cs_add_animation_name', ['cs-label']),
      createInput('', ['cs-text-input'], 'cs_add_animation_name', {
        placeholder: 'Must provide',
      }),
      createButton('Add', ['inline-btn', 'text-primary'], '', function () {
        const name = `${getNode('#cs_add_animation_name').value}`
        if (!name) {
          alertMe('invalidInput')
          return
        }
        if (getNode('#cs_ani_name')) {
          createOption(getNode('#cs_ani_name'), name, name)
        }
        createOption(getNode('#cs_animation_list'), name, name)
        addNewAnimation(name)
      }),
    ]
  )
  const keyFrameSelectorBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Keyframe Selector', 'cs_add_animation_kf_selector', [
        'cs-label',
      ]),
      createInput('number', ['cs-num-input'], 'cs_add_animation_kf_selector', {
        value: 50,
      }),
      createSelect(['cs-select'], '', [], 'cs_animation_list', function () {
        const animation = animations[e.targe.value]
        const infoBox = getNode('.animation-info')
        infoBox.innerHTML = ''
        infoBox.appendChild(animationInfoShower(e.target.value, animation))
      }),
      createButton('Del', ['inline-btn', 'text-danger'], '', function (e) {
        e.preventDefault()
        const name = getNode('#cs_animation_list').value
        getNode(`#${name}`).remove()
        deleteAnimation(name)
        getNode(`.animation-info`).innerHTML = ''
      }),
    ]
  )
  return createFragment([addNewAnimationBox, keyFrameSelectorBox])
}

function animationInfoShower(name, animation) {
  if (Object.keys(animation).length === 0) return
  const fragment = createFragment()
  for (const key in animation) {
    const kfsStyles = animation[key]
    const kfsBox = createElement(
      'div',
      '',
      ['animation-kfs-box', `kfs-${kfs}`],
      [
        createSpan(`At ${kfs}%`, '', ['cs-kfs-label']),
        createButton(
          'Del',
          ['inline-btn', 'float-end', 'text-danger'],
          '',
          function (e) {
            e.target.parentElement.remove()
            removeAnimationKFS(name, kfs)
          }
        ),
      ]
    )
    for (const styleKey in kfsStyles) {
      kfsBox.appendChild(
        createAnimationInfo(name, key, styleKey, kfsStyles[styleKey])
      )
    }
    fragment.appendChild(kfsBox)
  }
  return fragment
}

function createAnimationInfo(name, kfs, key, value) {
  return createElement(
    'div',
    '',
    ['my-1', 'style-info'],
    [
      createSpan(`${key.trim()} : `, ['text-muted', 'mx-1', 'css-key']),
      createSpan(value, ['mx-1', 'css-value'], `ani_${key.trim()}_value`),
      createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        function (e) {
          e.target.parentElement.remove()
          removeAnimationStyle(name, kfs, key)
        }
      ),
    ]
  )
}

function createAnimationKFSBox(name, kfs, key, value) {
  return createElement(
    'div',
    '',
    ['animation-kfs-box', `kfs-${kfs}`],
    [
      createSpan(`At ${kfs}%`, '', ['cs-kfs-label']),
      createButton(
        'Del',
        ['inline-btn', 'float-end', 'text-danger'],
        '',
        function (e) {
          e.target.parentElement.remove()
          removeAnimationKFS(name, kfs)
        }
      ),
      createAnimationInfo(name, kfs, key, value),
    ]
  )
}

export {
  animations,
  deleteAnimation,
  saveAnimationsStyle,
  addNewAnimation,
  removeAnimationKFS,
  removeAnimationStyle,
  createAnimationForm,
  createAnimationInfo,
  createAnimationKFSBox,
}
