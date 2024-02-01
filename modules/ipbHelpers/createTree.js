'use strict'

import dom from '../dom/index.js'
import notify from '../notify.js'
import { removeNode, selectNode } from '../stackTree.js'

const _ = dom()
const notifier = notify(_)

function createTableController(data) {
  const {
    children: [tHeadData, tBodyData, tFootData],
    attrs: { id },
  } = data
  function createTRNode(trData) {
    const {
      attrs: { id },
      children,
    } = trData

    const fragment = _.createFragment()
    for (const child of children) {
      let text = child.children[0] || 'td'
      fragment.appendChild(
        _.createButton(text.slice(0, 5), ['stack-node'], '', (e) => {
          selectNode(e, `#${child.attrs.id}`)
        })
      )
    }
    return _.createElement(
      'div',
      '',
      ['stack-node-box'],
      [
        _.createButton('tr', ['stack-node'], '', (e) => {
          selectNode(e, `#${id}`)
        }),
        _.createElement('div', '', ['stack-node-box'], [fragment]),
      ]
    )
  }

  const tableHeader = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton('tHead', ['stack-node'], '', (e) => {
        selectNode(e, `#${tHeadData.attrs.id}`)
      }),
      createTRNode(tHeadData.children[0]),
    ]
  )

  const tableFooter = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton('tFoot', ['stack-node'], '', (e) => {
        selectNode(e, `#${tFootData.attrs.id}`)
      }),
      createTRNode(tFootData.children[0]),
    ]
  )

  const bodyDataFragment = _.createFragment()
  for (const bodyChild of tBodyData.children) {
    bodyDataFragment.appendChild(createTRNode(bodyChild))
  }

  const tableBody = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton('tBody', ['stack-node'], '', (e) => {
        selectNode(e, `#${tBodyData.attrs.id}`)
      }),
      bodyDataFragment,
    ]
  )

  const tableStacks = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [tableHeader, tableBody, tableFooter],
    `${id}_c`
  )

  tableStacks.style.backgroundColor = 'rgba(0, 0, 0, 0.109)'

  return _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton('table', ['stack-node'], '', (e) => {
        selectNode(e, `#${id}`)
      }),
      _.createButton('Del', ['stack-node-delete', 'text-danger'], '', (e) => {
        removeNode(e, `#${id}`)
      }),
      tableStacks,
    ]
  )
}

function createControllers(eleData) {
  try {
    const {
      attrs: { id },
      tagName,
      children,
    } = eleData

    if (tagName === 'TABLE') {
      return createTableController(eleData)
    }

    const childBox = _.createElement('', '', '', [], `${id}_c`)
    childBox.style.background = 'rgba(0, 0, 0, 0.109)'
    for (const child of children) {
      if (typeof child === 'object') {
        const childEle = createControllers(child)
        if (!childEle) return notifier.on('invalidFile')
        childBox.appendChild(childEle)
      }
    }

    let text
    if (typeof children[0] === 'string') {
      text = `${tagName}-${children[0].slice(0, 5)}...`
    }

    return _.createElement(
      '',
      '',
      ['stack-node-box'],
      [
        _.createButton(text || tagName, ['stack-node'], '', (e) =>
          selectNode(e, `#${id}`)
        ),
        _.createButton('Del', ['stack-node-delete', 'text-danger'], '', (e) =>
          removeNode(e, `#${id}`)
        ),
        childBox,
      ]
    )
  } catch (error) {
    notifier.on('invalidFile')
    return false
  }
}

function buildApp(tree) {
  return _.createTag(tree)
}

function buildElementTree(tree) {
  const fragment = _.createFragment()
  for (const child of tree.children) {
    if (typeof child === 'string') continue
    fragment.appendChild(createControllers(child))
  }
  return fragment
}

export { buildApp, buildElementTree }
