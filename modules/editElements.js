'use strict'

import dom from './dom/index.js'
import { selectedNode } from './stackTree.js'
import Validator from './validator/index.js'
import notify from './notify.js'
import EditForms from './editHelpers/editFormCreator.js'
import { lockBtn } from './helpers/lockBtn.js'

const _ = dom()
const notifier = notify(_)
const editForms = EditForms(_)
const validator = Validator()
const getEditFormBtn = _.getNode('.get-edit-form-btn')
const removeEditFormBtn = _.getNode('.remove-edit-form-btn')

_.on('click', getEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(getEditFormBtn, 1000)
  _.getNodeById('edit_form')?.remove()
  if (validator.isInvalidTextInput(selectedNode)) {
    notifier.on('unEditable')
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

export default 'edit forms joined'
