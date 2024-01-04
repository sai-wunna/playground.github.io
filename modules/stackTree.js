import Document from './dom/index.js'
import { generateURC } from './randoms/index.js'
import { isInvalidEleToShow } from './validators/isValidEleToShow.js'
import { alertMe } from './alert.js'
import { lockBtn } from './helpers/lockBtn.js'
import { removeCusStyle } from './stylesHelpers/customStyles.js'
import { createTargetStyleInfoBox } from './stylesHelpers/styleInfoBoxes.js'

const _ = Document()
const randomColor = generateURC()

const high_light_ele = _.getNode('#high_light_ele')
const element_pointer = _.getNode('#element_pointer')
const appNode = _.getNode('.app-node')

let selectedNode = '#app'
let selectedTreeNode = '#children'
let elementsCounter = {
  header: 0,
  span: 0,
  button: 0,
  block: 0,
  paragraph: 0,
  input: 0,
  list: 0,
  link: 0,
  image: 0,
  selection: 0,
  table: 0,
  breaker: 0,
  figure: 0,
}

_.on('click', appNode, (e) => {
  e.preventDefault()
  lockBtn(e.target)
  setSelectedNodeStyle(appNode)
  selectAppNode()
})

_.on('change', high_light_ele, (e) => {
  e.preventDefault()
  if (high_light_ele.checked) {
    pointOutTheEle(selectedNode)
  } else {
    removePointOutTheEle()
  }
})

function addTableStack(tableId, thData, tbData, tfData) {
  elementsCounter.table = elementsCounter.table + 1
  function createTRNode(data, trId) {
    const fragment = _.createFragment()
    data.forEach((one) => {
      fragment.appendChild(
        _.createButton(
          one.text || one.heading || 'td',
          ['stack-node'],
          '',
          (e, id) => {
            selectNode(e, id)
          },
          `#${one.id}`
        )
      )
    })
    return _.createElement(
      'div',
      '',
      ['stack-node-box'],
      [
        _.createButton(
          'tr',
          ['stack-node'],
          '',
          (e, id) => {
            selectNode(e, id)
          },
          `#${trId}`
        ),
        _.createElement('div', '', ['stack-node-box'], [fragment]),
      ]
    )
  }
  const tableHeader = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton(
        'tHead',
        ['stack-node'],
        '',
        (e, id) => {
          selectNode(e, id)
        },
        `#${thData.thId}`
      ),
      createTRNode(thData.data, thData.trId),
    ]
  )
  const tableFooter = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton(
        'tFoot',
        ['stack-node'],
        '',
        (e, id) => {
          selectNode(e, id)
        },
        `#${tfData.tfId}`
      ),
      createTRNode(tfData.data, tfData.trId),
    ]
  )
  const bodyDataFragment = _.createFragment()
  tbData.data.forEach((data) => {
    bodyDataFragment.appendChild(createTRNode(data.data, data.trId))
  })
  const tableBody = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton(
        'tBody',
        ['stack-node'],
        '',
        (e, id) => {
          selectNode(e, id)
        },
        `#${tbData.tbId}`
      ),
      bodyDataFragment,
    ]
  )
  const tableStacks = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [tableHeader, tableBody, tableFooter],
    `${tableId}_c`
  )
  tableStacks.style.backgroundColor = randomColor.generate()
  const tableNode = _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton(
        'table',
        ['stack-node'],
        '',
        (e, id) => {
          selectNode(e, id)
        },
        `#${tableId}`
      ),
      _.createButton(
        'Del',
        ['stack-node-delete', 'text-danger'],
        '',
        (e, id) => {
          removeNode(e, id)
        },
        `#${tableId}`,
        'table'
      ),
      tableStacks,
    ]
  )
  if (_.getNode('#beforeOrAfter').checked && selectedNode !== '#app') {
    _.getNode(`${selectedTreeNode}_c`).parentElement.parentElement.insertBefore(
      tableNode,
      _.getNode(`${selectedTreeNode}_c`).parentElement
    )
  } else {
    _.getNode(`${selectedTreeNode}_c`).appendChild(tableNode)
  }
  pointOutTheEle(selectedNode)
}

function addListStack(type, id, lists) {
  elementsCounter.list = elementsCounter.list + 1
  const listItemNode = _.createFragment()
  lists.forEach((item) => {
    listItemNode.appendChild(createTreeNode(item.id, 'list item'))
  })
  const listNode = createTreeNode(
    id,
    type === 'ol' ? 'Ordered List' : 'Unordered List',
    listItemNode
  )

  if (_.getNode('#beforeOrAfter').checked && selectedNode !== '#app') {
    _.getNode(`${selectedTreeNode}_c`).parentElement.parentElement.insertBefore(
      listNode,
      _.getNode(`${selectedTreeNode}_c`).parentElement
    )
  } else {
    _.getNode(`${selectedTreeNode}_c`).appendChild(listNode)
  }
  pointOutTheEle(selectedNode)
}

function addSelectionStack(selectId, options) {
  elementsCounter.selection = elementsCounter.selection + 1
  function createOption(text, id) {
    return _.createElement(
      'div',
      '',
      ['stack-node-box'],
      [
        _.createButton(
          text,
          ['stack-node'],
          '',
          (e, id) => {
            selectNode(e, id)
          },
          `#${id}`
        ),
        _.createButton(
          'Del',
          ['stack-node-delete', 'text-danger'],
          '',
          (e, id, selectId) => {
            e.preventDefault()
            _.getNode(selectId).querySelector(id).remove()
            e.target.parentElement.remove()
            if (id === selectedNode) {
              selectAppNode()
            } else {
              pointOutTheEle(selectedNode)
            }
          },
          `#${id}`,
          `#${selectId}`
        ),
      ]
    )
  }
  const optionFragment = _.createFragment()
  options.forEach((option) => {
    optionFragment.appendChild(createOption(option.text, option.id))
  })
  const selectionNode = createTreeNode(selectId, 'Select', optionFragment)

  if (_.getNode('#beforeOrAfter').checked && selectedNode !== '#app') {
    _.getNode(`${selectedTreeNode}_c`).parentElement.parentElement.insertBefore(
      selectionNode,
      _.getNode(`${selectedTreeNode}_c`).parentElement
    )
  } else {
    _.getNode(`${selectedTreeNode}_c`).appendChild(selectionNode)
  }
  pointOutTheEle(selectedNode)
}

function addFigureStack(stacksArr) {
  elementsCounter.figure = elementsCounter.figure + 1
  const fragment = _.createFragment()
  for (let i = 2; i < stacksArr.length; i += 2) {
    fragment.appendChild(createTreeNode(stacksArr[i], stacksArr[i + 1]))
  }
  const newStack = createTreeNode(stacksArr[0], stacksArr[1], fragment)
  if (_.getNode('#beforeOrAfter').checked && selectedNode !== '#app') {
    _.getNode(`${selectedTreeNode}_c`).parentElement.parentElement.insertBefore(
      newStack,
      _.getNode(`${selectedTreeNode}_c`).parentElement
    )
  } else {
    _.getNode(`${selectedTreeNode}_c`).appendChild(newStack)
  }
  pointOutTheEle(selectedNode)
}

function addNewStack(id, name) {
  elementsCounter[name.split(' ')[0]] = elementsCounter[name.split(' ')[0]] + 1
  const newStack = createTreeNode(id, name)
  if (_.getNode('#beforeOrAfter').checked && selectedNode !== '#app') {
    _.getNode(`${selectedTreeNode}_c`).parentElement.parentElement.insertBefore(
      newStack,
      _.getNode(`${selectedTreeNode}_c`).parentElement
    )
  } else {
    _.getNode(`${selectedTreeNode}_c`).appendChild(newStack)
  }
  pointOutTheEle(selectedNode)
}

function createTreeNode(id, name, children) {
  const childrenBox = _.createElement('div', '', [], [], `${id}_c`)
  if (children) {
    childrenBox.appendChild(children)
  }
  childrenBox.style.backgroundColor = randomColor.generate()
  return _.createElement(
    'div',
    '',
    ['stack-node-box'],
    [
      _.createButton(
        name,
        ['stack-node'],
        '',
        (e, id) => {
          selectNode(e, id)
        },
        `#${id}`
      ),
      _.createButton(
        'Del',
        ['stack-node-delete', 'text-danger'],
        '',
        (e, id) => {
          removeNode(e, id)
        },
        `#${id}`
      ),
      childrenBox,
    ]
  )
}

function selectNode(e, id) {
  lockBtn(e.target)
  if (id === selectedNode) return
  pointOutTheEle(id)
  selectedNode = selectedTreeNode = id
  setTargetEleShowers(id)
  createTargetStyleInfoBox(id)
  setSelectedNodeStyle(e.target)

  _.getNode('#edit_form')?.remove()
}

function removeNode(e, id) {
  _.getNode(id).remove()
  e.target.parentElement.remove()
  if (id === selectedNode || !_.getNode(selectedNode)) {
    selectAppNode()
  } else {
    pointOutTheEle(selectedNode)
  }
  removeCusStyle(id)
}

function setSelectedNodeStyle(node) {
  _.getNode('.selected-node')?.classList.remove('selected-node')
  node.classList.add('selected-node')
}

function selectAppNode() {
  removePointOutTheEle()
  if ('#app' === selectedNode) return
  _.getNode('.app-node').classList.add('selected-node')
  setTargetEleShowers('#app')
  selectedNode = '#app'
  selectedTreeNode = '#children'
  createTargetStyleInfoBox('#app')
  _.getNode('#edit_form')?.remove()
}

function setTargetEleShowers(target) {
  _.getNode('#selected_ele_shower').textContent = target
  _.getNode('#styling_ele_shower').textContent = target
  _.getNode('#edit_ele_shower').textContent = target
}

function pointOutTheEle(ele) {
  if (!high_light_ele.checked) return
  let element
  if (ele && typeof ele !== 'object') {
    if (isInvalidEleToShow(ele)) {
      alertMe('hidden')
      removePointOutTheEle()
      return
    }
    element = document.querySelector(ele) || document.querySelector('#app')
  } else {
    element = ele
  }

  if (!element) {
    return
  }
  const rect = element.getBoundingClientRect()
  const scrollLeft = document.documentElement.scrollLeft
  const scrollTop = document.documentElement.scrollTop

  const left = rect.left + scrollLeft
  const top = rect.top + scrollTop

  element_pointer.style.width = rect.width + 'px'
  element_pointer.style.height = rect.height + 'px'
  element_pointer.style.left = left + 'px'
  element_pointer.style.top = top + 'px'
  element_pointer.style.display = 'block'
}

function removePointOutTheEle() {
  element_pointer.style.display = 'none'
}

export {
  addNewStack,
  addTableStack,
  addSelectionStack,
  addListStack,
  addFigureStack,
  pointOutTheEle,
  elementsCounter,
  selectedNode,
}
