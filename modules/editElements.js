import Document from './dom/index.js'
import { selectedNode } from './stackTree.js'
import Validator from './validators/index.js'
import Alert from './alert.js'
import EditForms from './editHelpers/editFormCreator.js'
import { lockBtn } from './helpers/lockBtn.js'

const _ = Document()
const alert = Alert()
const validator = Validator()
const editForms = EditForms()
const getEditFormBtn = _.getNode('.get-edit-form-btn')
const removeEditFormBtn = _.getNode('.remove-edit-form-btn')

_.on('click', getEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(getEditFormBtn, 1000)
  _.getNodeById('edit_form')?.remove()
  if (validator.isInvalidTextInput(selectedNode)) {
    alert.alertMe('unEditable')
    return
  }
  let form
  if (selectedNode.startsWith('#img')) {
    form = editForms.imageForm(selectedNode)
  } else if (selectedNode.startsWith('#link')) {
    form = editForms.linkForm(selectedNode)
  } else if (selectedNode.startsWith('#option')) {
    form = editForms.optionForm(selectedNode)
  } else if (selectedNode.startsWith('#blockquote')) {
    form = editForms.blockQuoteForm(selectedNode)
  } else {
    form = editForms.textNodeForm(selectedNode)
  }
  _.getNode('.edit-text').appendChild(form)
})

_.on('click', removeEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(removeEditFormBtn, 1000)
  _.getNodeById('edit_form')?.remove()
})
