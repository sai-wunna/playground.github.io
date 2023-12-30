import { alertMe } from '../alert.js'
import {
  appendChildrenTo,
  createButton,
  createElement,
  createFragment,
  createHeading,
  createInput,
  createOption,
  createSelect,
  createSpan,
  getNode,
} from '../dom/index.js'

// { btn : { general : { standard : { color : red } , hover : { color : 'silver'}} , medium : { standard : { color : 'blue'}}} }
const classNames = {}

const mediaTypes = ['general', 'medium', 'large']
const conditionTypes = ['standard', 'hover', 'active', 'focus']

function addNewClassName(name) {
  classNames[name] = {
    general: { standard: {}, hover: {}, active: {}, focus: {} },
    medium: { standard: {}, hover: {}, active: {}, focus: {} },
    large: { standard: {}, hover: {}, active: {}, focus: {} },
  }
}

function saveCNStyle(name, media, condition, key, value) {
  classNames[name][media][condition][key] = value

  // push to doc
  const existedNode = getNode(`#${media}_${condition}_${key}_value`)
  if (existedNode) {
    existedNode.textContent = value
    return
  } else {
    getNode(`.${media}-screen-${condition}-styles`).appendChild(
      createStyleInfo(name, media, condition, key, value)
    )
  }
}

function removeClassName(name) {
  delete classNames[name]
}

function removeCNStyle(name, media, condition, key) {
  delete classNames[name][media][condition][key]
}

function createStyleInfo(name, media, condition, key, value) {
  return createElement(
    '',
    '',
    ['my-1', 'style-info'],
    [
      createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      createSpan(
        value,
        ['mx-1', 'css-value'],
        `${media}_${condition}_${key.trim()}_value`
      ),
      createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        (e) => {
          e.target.parentElement.remove()
          removeCNStyle(name, media, condition, key)
        }
      ),
    ]
  )
}

function createCNInfoShower(cn) {
  const className = classNames[cn] || {
    general: { standard: {}, hover: {}, active: {}, focus: {} },
    medium: { standard: {}, hover: {}, active: {}, focus: {} },
    large: { standard: {}, hover: {}, active: {}, focus: {} },
  }
  const appliedStyles = createElement('', '', ['applied-styles'], [])

  mediaTypes.forEach((mediaType) => {
    const header = createHeading('h6', `${mediaType} screen size`)
    const mediaBox = createElement('', '', [`${mediaType}-screen`])

    conditionTypes.forEach((conditionType) => {
      const stylesInfoBox = createFragment()
      const styles = className[mediaType][conditionType]

      if (Object.keys(styles).length !== 0) {
        for (let key in styles) {
          stylesInfoBox.appendChild(
            createStyleInfo(cn, mediaType, conditionType, key, styles[key])
          )
        }
      }
      mediaBox.appendChild(
        createElement(
          '',
          '',
          [`${mediaType}-screen-${conditionType}`],
          [
            createElement('', `${conditionType} -`, ['style-type-label']),
            createElement(
              '',
              '',
              [`${mediaType}-screen-${conditionType}-styles`],
              [stylesInfoBox]
            ),
          ]
        )
      )
    })
    appendChildrenTo(appliedStyles, [header, mediaBox])
  })
  return appliedStyles
}

function createCNForm() {
  const selectCN = createSelect(
    ['cs-select'],
    '',
    [],
    'class_name_list',
    function (e) {
      const infoBox = getNode('.class-names-box')
      infoBox.lastChild.remove()
      infoBox.appendChild(createCNInfoShower(e.target.value))
    }
  )
  for (let name in classNames) {
    createOption(selectCN, name, name, name)
  }
  const form = createElement(
    '',
    '',
    [
      'class-names-form',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    ],
    [
      createButton('Del', ['inline-btn', 'text-danger'], '', function () {
        const name = getNode('#class_name_list').value
        if (!name) return
        getNode(`#${name}`).remove()
        getNode('.class-name-info').innerHTML = ''
        removeClassName(name)
        for (let cn in classNames) {
          getNode('.class-name-info').appendChild(createCNInfoShower(cn))
          break
        }
      }),
      selectCN,
      createInput('', ['cs-text-input'], 'add_new_cn'),
      createButton('Add', ['inline-btn'], '', function (e) {
        let name = getNode('#add_new_cn').value
        if (!name) {
          alertMe('invalidInput')
          return
        }
        name = `prv-${name.trim().split(' ').join('-')}`
        addNewClassName(name)
        createOption(getNode('#class_name_list'), name, name, name)
      }),
    ]
  )
  return form
}

export {
  classNames,
  saveCNStyle,
  removeClassName,
  createCNForm,
  createCNInfoShower,
}
