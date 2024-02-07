'use strict'

import notifier from '../notify.js'
import _ from '../dom/index.js'
// { btn : { general : { standard : { color : red } , hover : { color : 'silver'}} , medium : { standard : { color : 'blue'}}} }
const classNames = {}
const mediaTypes = ['general', 'medium', 'large']

function insertClassNames(data) {
  for (const key in classNames) {
    delete classNames[key]
  }
  for (const [k, v] of Object.entries(data)) {
    classNames[k] = v
  }
}

function addNewClassName(name) {
  // consumers : [ { consumer : 'prv-header' | '~prv-header' , styles : { }} ]
  classNames[name] = {
    general: {
      standard: {},
      hover: { self: {}, consumers: [] },
      active: { self: {}, consumers: [] },
      focus: { self: {}, consumers: [] },
    },
    medium: {
      standard: {},
      hover: { self: {}, consumers: [] },
      active: { self: {}, consumers: [] },
      focus: { self: {}, consumers: [] },
    },
    large: {
      standard: {},
      hover: { self: {}, consumers: [] },
      active: { self: {}, consumers: [] },
      focus: { self: {}, consumers: [] },
    },
  }
}

function saveCNStyle(name, media, condition, consumer = 'self', key, value) {
  if (condition === 'standard') {
    classNames[name][media].standard[key] = value
  } else {
    if (consumer === 'self') {
      classNames[name][media][condition].self[key] = value
    } else {
      if (!classNames[consumer.slice(1)] || name === consumer.slice(1)) {
        return notifier.on('invalidCN')
      }
      const consumerIdx = classNames[name][media][
        condition
      ].consumers.findIndex((one) => one.consumer === consumer)
      if (consumerIdx === -1) {
        classNames[name][media][condition].consumers.push({
          consumer,
          styles: { [`${key}`]: value },
        })
      } else {
        classNames[name][media][condition].consumers[consumerIdx].styles[key] =
          value
      }
    }
  }
  // state data manipulation done

  const existedNode = _.getNodeById(
    `${media}_${condition}_${consumer}_${key.trim()}_value`
  )
  if (existedNode) {
    existedNode.textContent = value
  } else {
    const existedInfoBox = _.getNode(
      `.${media}-${condition}-${consumer}-styles`
    )
    const styleInfo = createStyleInfo(
      name,
      media,
      condition,
      consumer,
      key,
      value
    )
    if (existedInfoBox) {
      _.getNode(`.${media}-${condition}-${consumer}-styles`).appendChild(
        styleInfo
      )
    } else {
      _.getNode(`.${media}-screen-styles`).appendChild(
        createNewConditionStyleBox(name, media, condition, consumer, styleInfo)
      )
    }
  }
}

function removeConditionStyles(name, media, condition, consumer = 'self') {
  if (condition === 'standard') {
    classNames[name][media].standard = {}
    return
  }
  if (consumer === 'self') {
    classNames[name][media][condition].self = {}
    return
  }
  classNames[name][media][condition].consumers = [
    ...classNames[name][media][condition].consumers.filter(
      (one) => one.consumer !== consumer
    ),
  ]
}

function removeClassName(name) {
  delete classNames[name]
}

function removeSingleStyle(name, media, condition, consumer, key) {
  if (condition === 'standard') {
    delete classNames[name][media].standard[key]
    return null
  }
  if (consumer === 'self') {
    delete classNames[name][media][condition].self[key]
    return null
  }
  const consumerIdx = classNames[name][media][condition].consumers.findIndex(
    (one) => one.consumer === consumer
  )
  delete classNames[name][media][condition].consumers[consumerIdx].styles[key]
}

function createStyleInfo(name, media, condition, consumer, key, value) {
  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${media}-${condition}-${consumer}-${key}`

  return _.createElement(
    '',
    '',
    ['my-1', 'style-info'],
    [
      _.createSpan(`${key.trim()} : `, ['mx-1', 'css-key']),
      _.createSpan(
        value,
        ['mx-1', 'css-value'],
        `${media}_${condition}_${consumer}_${key.trim()}_value`
      ),
      delBtn,
    ]
  )
}

function createNewConditionStyleBox(
  name,
  media,
  condition,
  consumer,
  styleInfoFragment
) {
  const styleTypeLabel =
    condition === 'standard'
      ? 'Standard'
      : `${condition} ${consumer === 'self' ? '' : consumer}`

  const delBtn = _.createButton('Del', [
    'inline-btn',
    'text-danger',
    'float-end',
  ])
  delBtn.dataset.props = `${media}-${condition}-${consumer}`

  return _.createElement(
    '',
    '',
    [`${media}-${condition}-${consumer}-styles`],
    [
      delBtn,
      _.createElement('', styleTypeLabel, ['style-type-label']),
      styleInfoFragment,
    ]
  )
}

function createListenerWrapper(name) {
  const wrapper = _.createElement('', '', ['style-info-listener-wrapper'], [])
  wrapper.addEventListener('click', handleClick)
  function handleClick(e) {
    e.stopPropagation()
    if (e.target.type !== 'button') return
    e.target.parentElement.remove()
    const [media, condition, consumer, key] = e.target.dataset.props.split('-')
    if (!key) {
      removeConditionStyles(name, media, condition, consumer)
      return
    }
    removeSingleStyle(name, media, condition, consumer, key)
  }
  return [wrapper, () => wrapper.removeEventListener('click', handleClick)]
}

function createCNInfoShower(cn) {
  const className = classNames[cn]
  const [wrapper, wrapperEvtCleaner] = createListenerWrapper(cn)

  if (!className) {
    wrapper.appendChild(
      _.createElement(
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
    )
    return [wrapper, wrapperEvtCleaner]
  }

  function createConditionStyleBox(name, media, condition, consumer, styles) {
    const fragment = _.createFragment()

    for (const [key, value] of Object.entries(styles)) {
      fragment.appendChild(
        createStyleInfo(name, media, condition, consumer, key, value)
      )
    }

    const styleTypeLabel =
      condition === 'standard'
        ? 'standard'
        : `${condition} ${consumer === 'self' ? '' : consumer}`

    const delBtn = _.createButton('Del', [
      'inline-btn',
      'text-danger',
      'float-end',
    ])
    delBtn.dataset.props = `${media}-${condition}-${consumer}`

    return _.createElement(
      '',
      '',
      [`${media}-${condition}-${consumer}-styles`],
      [
        delBtn,
        _.createElement('', styleTypeLabel, ['style-type-label']),
        fragment,
      ]
    )
  }

  mediaTypes.forEach((media) => {
    const mediaStyles = className[media]
    const mediaStyleBox = _.createElement(
      '',
      '',
      [`${media}-screen-styles`],
      [_.createHeading('h6', `${media} Screen`)]
    )

    for (const [condition, conditionDetail] of Object.entries(mediaStyles)) {
      if (condition === 'standard') {
        if (Object.keys(conditionDetail).length > 0) {
          mediaStyleBox.appendChild(
            createConditionStyleBox(
              cn,
              media,
              condition,
              'self',
              conditionDetail
            )
          )
        }
      } else {
        if (Object.keys(conditionDetail.self).length > 0) {
          mediaStyleBox.appendChild(
            createConditionStyleBox(
              cn,
              media,
              condition,
              'self',
              conditionDetail.self
            )
          )
        }
        for (const consumerDetail of conditionDetail.consumers) {
          mediaStyleBox.appendChild(
            createConditionStyleBox(
              cn,
              media,
              condition,
              consumerDetail.consumer,
              consumerDetail.styles
            )
          )
        }
      }
    }

    wrapper.appendChild(mediaStyleBox)
  })

  return [wrapper, wrapperEvtCleaner]
}

export {
  classNames,
  saveCNStyle,
  addNewClassName,
  removeClassName,
  createCNInfoShower,
  insertClassNames,
}
