import { alertMe } from '../alert.js'
import Document from '../dom/index.js'

const _ = Document()

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
  const existedNode = _.getNode(`#${media}_${condition}_${key}_value`)
  if (existedNode) {
    existedNode.textContent = value
    return
  } else {
    _.getNode(`.${media}-screen-${condition}-styles`).appendChild(
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
  const appliedStyles = _.createElement('', '', ['applied-styles'], [])

  mediaTypes.forEach((mediaType) => {
    const header = _.createHeading('h6', `${mediaType} screen size`)
    const mediaBox = _.createElement('', '', [`${mediaType}-screen`])

    conditionTypes.forEach((conditionType) => {
      const stylesInfoBox = _.createFragment()
      const styles = className[mediaType][conditionType]

      if (Object.keys(styles).length !== 0) {
        for (let key in styles) {
          stylesInfoBox.appendChild(
            createStyleInfo(cn, mediaType, conditionType, key, styles[key])
          )
        }
      }
      mediaBox.appendChild(
        _.createElement(
          '',
          '',
          [`${mediaType}-screen-${conditionType}`],
          [
            _.createElement('', `${conditionType} -`, ['style-type-label']),
            _.createElement(
              '',
              '',
              [`${mediaType}-screen-${conditionType}-styles`],
              [stylesInfoBox]
            ),
          ]
        )
      )
    })
    _.appendChildrenTo(appliedStyles, [header, mediaBox])
  })
  return appliedStyles
}

function createCNForm() {
  const selectCN = _.createSelect(
    ['cs-select'],
    '',
    [],
    'class_name_list',
    function (e) {
      const infoBox = _.getNode('.class-names-box')
      infoBox.lastChild.remove()
      infoBox.appendChild(createCNInfoShower(e.target.value))
    }
  )
  for (let name in classNames) {
    _.createOption(selectCN, name, name, name)
  }
  const form = _.createElement(
    '',
    '',
    [
      'class-names-form',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    ],
    [
      _.createButton('Del', ['inline-btn', 'text-danger'], '', function () {
        const name = _.getNode('#class_name_list').value
        if (!name) return
        _.getNode(`#${name}`).remove()
        _.getNode('.class-names-box').lastChild.remove()
        removeClassName(name)
        if (classNames.length > 0) {
          for (let cn in classNames) {
            _.getNode('.class-names-box').appendChild(createCNInfoShower(cn))
            break
          }
        } else {
          _.getNode('.class-names-box').appendChild(createCNInfoShower(''))
        }
      }),
      selectCN,
      _.createInput('', ['cs-text-input'], 'add_new_cn'),
      _.createButton('Add', ['inline-btn'], '', function (e) {
        let name = _.getNode('#add_new_cn').value
        if (!name) {
          alertMe('invalidInput')
          return
        }
        name = `prv-${name.trim().split(' ').join('-')}`
        addNewClassName(name)
        _.createOption(_.getNode('#class_name_list'), name, name, name)
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
