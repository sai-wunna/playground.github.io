'use strict'

import _ from './dom/index.js'
import { selectedNode } from './stackTree.js'
import validator from './validator/index.js'
import notifier from './notify.js'
import EditForms from './editHelpers/editFormCreator.js'
import { lockBtn } from './helpers/lockBtn.js'

const editForms = new EditForms(_)
const getEditFormBtn = _.getNode('.get-edit-form-btn')
const removeEditFormBtn = _.getNode('.remove-edit-form-btn')

let formEvtCleaner = null
_.on('click', getEditFormBtn, (e) => {
  e.preventDefault()
  lockBtn(getEditFormBtn, 1000)
  _.getNodeById('edit_form')?.remove()
  if (validator.isInvalidTextInput(selectedNode)) {
    notifier.on('unEditable')
    return
  }
  if (formEvtCleaner) {
    formEvtCleaner() // cleanup previous form evt
  }
  let form
  if (selectedNode.startsWith('#img')) {
    ;[form, formEvtCleaner] = editForms.imageForm(selectedNode)
  } else if (selectedNode.startsWith('#link')) {
    ;[form, formEvtCleaner] = editForms.linkForm(selectedNode)
  } else if (selectedNode.startsWith('#option')) {
    ;[form, formEvtCleaner] = editForms.optionForm(selectedNode)
  } else if (selectedNode.startsWith('#blockquote')) {
    ;[form, formEvtCleaner] = editForms.blockQuoteForm(selectedNode)
  } else {
    ;[form, formEvtCleaner] = editForms.textNodeForm(selectedNode)
  }
  _.getNode('.edit-text').appendChild(form)
})

_.on('click', removeEditFormBtn, (e) => {
  e.preventDefault()
  formEvtCleaner()
  formEvtCleaner = null
  lockBtn(removeEditFormBtn, 1000)
  _.getNodeById('edit_form')?.remove()
})

export default 'edit forms joined'
