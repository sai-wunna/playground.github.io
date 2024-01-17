import Alert from '../alert.js'
import Document from '../dom/index.js'

const _ = Document()
const alert = Alert()

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
  let newName = name || `animation_${new Date().getTime()}`
  animations[newName] = {}
}

function saveAnimationsStyle(name, kfSelector, key, value) {
  if (animations[name][kfSelector]) {
    if (animations[name][kfSelector][key]) {
      _.getNodeById(`ani_${kfSelector}_${key}_value`).textContent = value
    } else {
      _.getNode(`.kfs-${kfSelector}`).appendChild(
        createAnimationInfo(name, kfSelector, key, value)
      )
    }
    animations[name][kfSelector][key] = value
  } else {
    animations[name][kfSelector] = { [`${key}`]: value }
    _.getNode('.animation-info').appendChild(
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
  const addNewAnimationBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Animation name', 'cs_add_animation_name', ['cs-label']),
      _.createInput('', ['cs-text-input'], 'cs_add_animation_name', {
        placeholder: 'Must provide',
      }),
      _.createButton('Add', ['inline-btn', 'text-primary'], '', function () {
        const name = `${_.getNodeById('cs_add_animation_name').value}`
        if (!name) {
          alert.alertMe('invalidInput')
          return
        }
        if (_.getNodeById('cs_ani_name')) {
          _.createOption(_.getNodeById('cs_ani_name'), name, name, name)
        }
        _.createOption(_.getNodeById('cs_animation_list'), name, name, name)
        addNewAnimation(name)
      }),
    ]
  )
  const animationsSelect = _.createSelect(
    ['cs-select'],
    '',
    [],
    'cs_animation_list',
    function (e) {
      const animation = animations[e.target.value]
      const infoBox = _.getNode('.animation-info')
      infoBox.innerHTML = ''
      infoBox.appendChild(animationInfoShower(e.target.value, animation))
    }
  )
  for (let name in animations) {
    _.createOption(animationsSelect, name, name, name)
  }
  const keyFrameSelectorBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Keyframe Selector', 'cs_add_animation_kf_selector', [
        'cs-label',
      ]),
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_add_animation_kf_selector',
        {
          value: 50,
        }
      ),
      animationsSelect,
      _.createButton('Del', ['inline-btn', 'text-danger'], '', function (e) {
        e.preventDefault()
        const name = _.getNodeById('cs_animation_list').value
        if (!name) return
        _.getNodeById(`${name}`).remove()
        deleteAnimation(name)
        _.getNode(`.animation-info`).innerHTML = ''
        for (const key in animations) {
          _.getNode('.animation-info').appendChild(animationInfoShower(key))
          break
        }
      }),
    ]
  )
  return _.createFragment([addNewAnimationBox, keyFrameSelectorBox])
}

function animationInfoShower(name) {
  const animation = animations[name]
  const fragment = _.createFragment()
  if (Object.keys(animation).length === 0) return fragment
  for (const [keyFrame, kfStyles] of Object.entries(animation)) {
    const kfsBox = _.createElement(
      'div',
      '',
      ['animation-kfs-box', `kfs-${keyFrame}`],
      [
        _.createSpan(`At ${keyFrame}%`, '', ['cs-kfs-label']),
        _.createButton(
          'Del',
          ['inline-btn', 'float-end', 'text-danger'],
          '',
          function (e) {
            e.target.parentElement.remove()
            removeAnimationKFS(name, keyFrame)
          }
        ),
      ]
    )
    for (const [key, value] of Object.entries(kfStyles)) {
      kfsBox.appendChild(createAnimationInfo(name, keyFrame, key, value))
    }
    fragment.appendChild(kfsBox)
  }
  return fragment
}

function createAnimationInfo(name, kfs, key, value) {
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
      _.createButton(
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
  return _.createElement(
    'div',
    '',
    ['animation-kfs-box', `kfs-${kfs}`],
    [
      _.createSpan(`At ${kfs}%`, '', ['cs-kfs-label']),
      _.createButton(
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
  saveAnimationsStyle,
  addNewAnimation,
  removeAnimationKFS,
  removeAnimationStyle,
  createAnimationForm,
  createAnimationInfo,
  createAnimationKFSBox,
  animationInfoShower,
  insertAnimation,
}
