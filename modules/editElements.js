import Document from './dom/index.js'
import { selectedNode } from './stackTree.js'
import Validator from './validators/index.js'
import Alert from './alert.js'
import {
  editBlockQuoteForm,
  editImageForm,
  editLinkForm,
  editOptionForm,
  textNodeForm,
} from './editHelpers/editFormCreator.js'
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
  } else if (selectedNode.startsWith('#option')) {
    form = editOptionForm(selectedNode)
  } else if (selectedNode.startsWith('#blockquote')) {
    form = editBlockQuoteForm(selectedNode)
  } else {
    form = textNodeForm(selectedNode)
  }
  _.getNode('.edit-text').appendChild(form)
})

_.on('click', removeEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(removeEditFormBtn, 1000)
  _.getNode('#edit_form')?.remove()
})
