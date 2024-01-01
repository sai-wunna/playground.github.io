import Document from '../dom/index.js'
const _ = Document()

// { #div_232334 : { general : { standard : { color : red } , hover : { color : 'silver'}} , medium : { standard : { color : 'blue'}}} }
const customStyles = {}

const mediaTypes = ['general', 'medium', 'large']
const conditionTypes = ['standard', 'hover', 'active', 'focus']

function saveCusStyle(node, media, condition, key, value) {
  if (!customStyles[node]) {
    customStyles[`${node}`] = {
      general: { standard: {}, hover: {}, active: {}, focus: {} },
      medium: { standard: {}, hover: {}, active: {}, focus: {} },
      large: { standard: {}, hover: {}, active: {}, focus: {} },
    }
  }
  customStyles[node][media][condition][key] = value
  // push to doc
  const existedNode = _.getNode(`#${media}_${condition}_${key}_value`)
  if (existedNode) {
    existedNode.textContent = value
    return
  } else {
    _.getNode(`.${media}-screen-${condition}-styles`).appendChild(
      createStyleInfo(node, media, condition, key, value)
    )
  }
}

function removeCusStyle(node) {
  delete customStyles[node]
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

function createCusStyleInfoShower(node) {
  const className = customStyles[node] || {
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
            createStyleInfo(node, mediaType, conditionType, key, styles[key])
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

export { customStyles, saveCusStyle, removeCusStyle, createCusStyleInfoShower }
