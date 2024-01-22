'use strict'
import Alert from './alert.js'
import Document from './dom/index.js'
import { lockBtn } from './helpers/lockBtn.js'
import {
  createInsertWrapper,
  drag_drop_box,
  confirmInsertBtn,
  fileInfo,
} from './ipbHelpers/createInsertWrapper.js'
import { insertAnimation } from './stylesHelpers/animations.js'
import { insertCustomStyles } from './stylesHelpers/customStyles.js'
import { insertClassNames } from './stylesHelpers/classNameStyles .js'
import { insertPredefinedStyles } from './stylesHelpers/predefinedStyles.js'
import { buildApp, buildElementTree } from './ipbHelpers/createTree.js'
import { buildCss } from './stylesHelpers/buildCss.js'
import Validators from './validators/index.js'

const _ = Document()
const alert = Alert(_)
const validator = Validators()

let app
let styles
let controllerTree

// drag drop handlers ----------------- start
function highlight() {
  drag_drop_box.classList.add('dragging')
}
function unHighlight() {
  drag_drop_box.classList.remove('dragging')
}

;['dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
  const listener = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  drag_drop_box.addEventListener(eventName, (e) => listener(e), false)
})
;['dragenter', 'dragover'].forEach((eventName) => {
  const listener = () => highlight(drag_drop_box)
  drag_drop_box.addEventListener(eventName, listener, false)
})
;['dragleave', 'drop'].forEach((eventName) => {
  const listener = () => unHighlight(drag_drop_box)
  drag_drop_box.addEventListener(eventName, listener, false)
})

drag_drop_box.addEventListener('drop', (e) => handleDrop(e), false)

function handleDrop(e) {
  const dt = e.dataTransfer
  const file = [...dt.files][0]
  if (!file) return alert.alertMe('fileOnly')
  if (file.type !== 'application/json') return alert.alertMe('notJson')
  if (file.size > 10000) return alert.alertMe('invalidFile')

  const reader = new FileReader()

  reader.onload = function (event) {
    const fileContent = event.target.result

    try {
      const data = JSON.parse(fileContent)
      if (validator.isInvalidInsertFile(data)) {
        alert.alertMe('invalidFile')
        return
      }
      app = buildApp(data.tree)
      controllerTree = buildElementTree(data.tree)
      styles = data.styles
      confirmInsertBtn.textContent = 'Ready, set up !'
      fileInfo.textContent = `${data.info.name} by ${data.info.author}`
    } catch (error) {
      alert.alertMe('invalidFile')
      app = controllerTree = styles = null
    }
  }

  reader.readAsText(file)
}
// drag drop handlers ----------------- end

_.on('click', confirmInsertBtn, (e) => {
  e.preventDefault()
  lockBtn(confirmInsertBtn)
  if (!app || !controllerTree || !styles) {
    app = controllerTree = styles = null
    return alert.alertMe('fileOnly')
  }

  alert.__start('Building . . .')

  const oldApp = _.getNodeById('app')
  const oldTree = _.getNodeById('children_c')

  oldApp.innerHTML = ''
  oldTree.innerHTML = ''

  _.getNodeById('app_wrapper').replaceChild(app, oldApp)
  oldTree.appendChild(controllerTree)

  insertAnimation(styles.animations)
  insertClassNames(styles.classNames)
  insertCustomStyles(styles.customStyles)
  insertPredefinedStyles(styles.predefinedStyles)
  _.getNodeById('my_styles').textContent = buildCss(
    styles.animations,
    styles.predefinedStyles,
    styles.classNames,
    styles.customStyles
  )

  app = controllerTree = styles = null
  confirmInsertBtn.textContent = '- - - - - - - -'
  fileInfo.textContent = '-'

  alert.__end('* Ready to go *')
})

function createInsertBox() {
  return createInsertWrapper()
}

export { createInsertBox }
