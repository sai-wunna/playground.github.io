import Document from './dom/index.js'
import { selectedNode } from './stackTree.js'
import Validator from './validators/index.js'
import { createTextNodes } from './editHelpers/createTextNodes.js'
import Alert from './alert.js'
import { editImageForm, editLinkForm } from './editHelpers/editFormCreator.js'
import { lockBtn } from './helpers/lockBtn.js'

const _ = Document()
const alert = Alert()
const validator = Validator()

const getEditFormBtn = _.getNode('.get-edit-form-btn')
const removeEditFormBtn = _.getNode('.remove-edit-form-btn')

_.on('click', getEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(getEditFormBtn, 1000)
  _.getNode('#edit_form')?.remove()
  if (validator.isInvalidTextInput(selectedNode)) {
    alert.alertMe('unEditable')
    return
  }
  let form
  if (selectedNode.startsWith('#img')) {
    form = editImageForm(selectedNode)
  } else if (selectedNode.startsWith('#link')) {
    form = editLinkForm(selectedNode)
  } else {
    form = createTextNodes(selectedNode)
  }
  _.getNode('.edit-text').appendChild(form)
})

_.on('click', removeEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(removeEditFormBtn, 1000)
  _.getNode('#edit_form')?.remove()
})
