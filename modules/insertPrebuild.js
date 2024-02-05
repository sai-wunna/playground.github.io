'use strict'
import notify from './notify.js'
import dom from './dom/index.js'
import { lockBtn } from './helpers/lockBtn.js'
import {
  createInsertWrapper,
  drag_drop_box,
  confirmInsertBtn,
  fileInfo,
} from './ipbHelpers/createInsertWrapper.js'
import { insertAnimation } from './stylesHelpers/animations.js'
import { insertCustomStyles } from './stylesHelpers/customStyles.js'
import { insertClassNames } from './stylesHelpers/classNameStyles.js'
import { insertPredefinedStyles } from './stylesHelpers/predefinedStyles.js'
import { buildApp, buildElementTree } from './ipbHelpers/createTree.js'
import {
  buildAnimationCssString,
  buildClassNamesString,
  buildCustomStylesString,
  buildPredefinedStylesString,
} from './stylesHelpers/buildCss.js'
import Validators from './validator/index.js'

const _ = dom()
const notifier = notify()
const validator = Validators()

let app
let styles
let controllerTree

// drag drop handlers ----------------- start
function highlight(e) {
  e.target.classList.add('dragging')
}
function unHighlight(e) {
  e.target.classList.remove('dragging')
}
function preventBubbling(e) {
  e.preventDefault()
  e.stopPropagation()
}

function handleDrop(e) {
  const dt = e.dataTransfer
  const file = [...dt.files][0]
  if (!file) return notifier.on('fileOnly')
  if (file.type !== 'application/json') return notifier.on('notJson')
  if (file.size > 100000) return notifier.on('invalidFile')

  const reader = new FileReader()

  reader.onload = function (event) {
    const fileContent = event.target.result

    try {
      const data = JSON.parse(fileContent)
      if (validator.isInvalidInsertFile(data)) {
        notifier.on('invalidFile')
        return
      }
      app = buildApp(data.tree)
      controllerTree = buildElementTree(data.tree)
      styles = data.styles
      confirmInsertBtn.textContent = 'Ready, set up !'
      fileInfo.textContent = `${data.info.name} by ${data.info.author}`
    } catch (error) {
      notifier.on('invalidFile')
      app = controllerTree = styles = null
    }
  }

  reader.readAsText(file)
}

async function handleConfirm(e) {
  e.preventDefault()

  lockBtn(confirmInsertBtn)
  if (!app || !controllerTree || !styles) {
    app = controllerTree = styles = null
    return notifier.on('fileOnly')
  }

  notifier.__start('Building . . .')
  const oldApp = _.getNodeById('app')
  const oldTree = _.getNodeById('children_c')

  const { animations, classNames, customStyles, predefinedStyles } = styles

  try {
    const animationCss = await buildAnimationCssString(animations)

    const predefinedStylesCss = await buildPredefinedStylesString(
      predefinedStyles
    )

    const customStylesCss = await buildCustomStylesString(customStyles)

    const classNameStylesCss = await buildClassNamesString(classNames)

    insertAnimation(animations)
    insertClassNames(classNames)
    insertCustomStyles(customStyles)
    insertPredefinedStyles(predefinedStyles)

    oldTree.innerHTML = ''
    oldTree.appendChild(controllerTree)

    _.getNodeById('app_wrapper').replaceChild(app, oldApp)

    _.getNodeById('my_animations').textContent = animationCss
    _.getNodeById('my_predefined_styles').textContent = predefinedStylesCss
    _.getNodeById('my_custom_styles').textContent = customStylesCss
    _.getNodeById('my_className_styles').textContent = classNameStylesCss

    notifier.__end('* Ready to go *')
  } catch (err) {
    notifier.__end('Please drop valid file')
  } finally {
    app = controllerTree = styles = null
    confirmInsertBtn.textContent = '- - - - - - - -'
    fileInfo.textContent = '-'
  }
}

function attachEvtHandlers() {
  ;['dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
    drag_drop_box.addEventListener(eventName, preventBubbling)
  })
  ;['dragenter', 'dragover'].forEach((eventName) => {
    drag_drop_box.addEventListener(eventName, highlight)
  })
  ;['dragleave', 'drop'].forEach((eventName) => {
    drag_drop_box.addEventListener(eventName, unHighlight)
  })

  drag_drop_box.addEventListener('drop', handleDrop)
  _.on('click', confirmInsertBtn, handleConfirm)
}

function cleanUpFunc() {
  ;['dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
    drag_drop_box.removeEventListener(eventName, preventBubbling, false)
  })
  ;['dragenter', 'dragover'].forEach((eventName) => {
    drag_drop_box.removeEventListener(eventName, highlight, false)
  })
  ;['dragleave', 'drop'].forEach((eventName) => {
    drag_drop_box.removeEventListener(eventName, unHighlight, false)
  })

  drag_drop_box.removeEventListener('drop', handleDrop, false)
  confirmInsertBtn.removeEventListener('click', handleConfirm)
}

function createInsertBox() {
  attachEvtHandlers()
  return [createInsertWrapper(), cleanUpFunc]
}

export default createInsertBox
