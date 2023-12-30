import { getNode, on } from './dom/index.js'
import { selectedNode } from './stackTree.js'
import { isInvalidTextInput } from './validators/isValidToWriteText.js'
import { createTextNodes } from './editHelpers/createTextNodes.js'
import { alertMe } from './alert.js'
import { editImageForm, editLinkForm } from './editHelpers/editFormCreator.js'
import { lockBtn } from './helpers/lockBtn.js'

const getEditFormBtn = getNode('.get-edit-form-btn')
const removeEditFormBtn = getNode('.remove-edit-form-btn')

on('click', getEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(getEditFormBtn, 1000)
  getNode('#edit_form')?.remove()
  if (isInvalidTextInput(selectedNode)) {
    alertMe('unEditable')
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
  getNode('.edit-text').appendChild(form)
})

on('click', removeEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(removeEditFormBtn, 1000)
  getNode('#edit_form')?.remove()
})
