import Document from './dom/index.js'
import Alert from './alert.js'
import DeployElement from './cefHelpers/deployElement.js'
import {
  addFigureStack,
  addListStack,
  addNewStack,
  addSelectionStack,
  addTableStack,
  selectedNode,
} from './stackTree.js'
import {
  manageListData,
  manageTData,
  manageSelectData,
} from './cefHelpers/manageInputData.js'
import CEF from './cefHelpers/createElementForms.js'
import { lockBtn } from './helpers/lockBtn.js'
import Validator from './validators/index.js'

const _ = Document()
const selectElementBtn = _.getNode('.elements-selection')
const add_element_btn = _.getNodeById('add_element_btn')
const element_form_box = _.getNode('.element-form')
const isInsertBefore = _.getNodeById('beforeOrAfter')

const validator = Validator()
const alert = Alert()
const forms = CEF()
const deploy = new DeployElement(
  addNewStack,
  addTableStack,
  addListStack,
  addSelectionStack,
  addFigureStack,
  isInsertBefore
)

// ---------------------- select and add -------------------

_.on('change', selectElementBtn, (e) => {
  e.preventDefault()
  const value = e.target.value
  _.getNodeById('add_form').remove()
  let form
  if (value === 'block') {
    form = forms.createBlockForm()
  } else if (value === 'image') {
    form = forms.createImageForm()
  } else if (value === 'heading') {
    form = forms.createHeadingForm()
  } else if (value === 'link') {
    form = forms.createLinkForm()
  } else if (value === 'paragraph') {
    form = forms.createParagraphForm()
  } else if (value === 'list') {
    form = forms.createListForm()
  } else if (value === 'span') {
    form = forms.createSpanForm()
  } else if (value === 'table') {
    form = forms.createTableForm()
  } else if (value === 'button') {
    form = forms.createButtonForm()
  } else if (value === 'selection') {
    form = forms.createSelectionForm()
  } else if (value === 'option') {
    form = forms.createOptionForm()
  } else if (value === 'figure') {
    form = forms.createFigureForm()
  } else if (value === 'blockquote') {
    form = forms.createBlockQuoteForm()
  } else if (value === 'br') {
    form = forms.createBrForm()
  } else {
    form = forms.createHrForm()
  }
  element_form_box.appendChild(form)
})

_.on('click', add_element_btn, (e) => {
  e.preventDefault()
  lockBtn(add_element_btn, 1000)
  const value = selectElementBtn.value

  if (validator.isInvalidInsert(selectedNode, value)) {
    alert.alertMe('unAppendAble')
    return
  }
  // deployment starts
  if (value === 'block') {
    const text = _.getNodeById('new_block').value
    deploy.block(text, selectedNode)
    // ------------------------------------------------
  } else if (value === 'image') {
    const src = _.getNodeById('new_image').value
    const alt = _.getNodeById('new_alt').value
    deploy.image(src, alt, selectedNode)
    // ------------------------------------------------
  } else if (value === 'heading') {
    const type = _.getNodeById('new_header').value
    const text = _.getNodeById('new_h_content').value
    deploy.heading(type, text, selectedNode)
    // ------------------------------------------------
  } else if (value === 'link') {
    const url = _.getNodeById('new_link').value.split(' ').join('')
    const type = _.getNodeById('link_type').value
    const text = _.getNodeById('new_link_name').value
    const title = _.getNodeById('new_title').value
    deploy.link(type, url, text, title, selectedNode)
    // ------------------------------------------------
  } else if (value === 'paragraph') {
    const text = _.getNodeById('new_para').value
    deploy.paragraph(text, selectedNode)
    // ------------------------------------------------
  } else if (value === 'list') {
    const type = _.getNodeById('list_type').value
    let lists = []
    _.getAllNodes('.list-value').forEach((item) => {
      lists.push(item.value)
    })
    lists = manageListData(lists)
    deploy.list(type, lists, selectedNode)
    // ------------------------------------------------
  } else if (value === 'span') {
    const text = _.getNodeById('new_text').value
    deploy.text(text, selectedNode)
    // ------------------------------------------------
  } else if (value === 'table') {
    const hData = []
    const bData = []
    const fData = []
    _.getAllNodes('.c-t-h-cell').forEach((cell) => hData.push(cell.value))
    _.getAllNodes('.c-t-b-cell').forEach((cell) => bData.push(cell.value))
    _.getAllNodes('.c-t-f-cell').forEach((cell) => fData.push(cell.value))
    const [thData, tbData, tfData] = manageTData(hData, bData, fData)
    deploy.table(thData, tbData, tfData, selectedNode)
    // ------------------------------------------------
  } else if (value === 'selection') {
    const options = []
    const values = []
    _.getAllNodes('.option-data').forEach((opt) => options.push(opt.value))
    _.getAllNodes('.option-value').forEach((value) => values.push(value.value))
    deploy.selection(manageSelectData(options, values), selectedNode)
    // ------------------------------------------------
  } else if (value === 'option') {
    const optValue = _.getNodeById('new_opt_value').value
    const optText = _.getNodeById('new_opt_text').value
    deploy.option(optValue, optText, selectedNode)
    // ------------------------------------------------
  } else if (value === 'button') {
    deploy.button(_.getNodeById('new_button').value, selectedNode)
    // ------------------------------------------------
  } else if (value === 'figure') {
    const type = _.getNodeById('new_img_or_audio').value
    let caption = _.getNodeById('new_caption').value
    const captionFirstOrNot = _.getNodeById('caption_first_or_not')
    if (type === 'image_box') {
      const src = _.getNodeById('new_image').value
      const alt = _.getNodeById('new_image_alt').value
      deploy.imageFigure({ src, alt, caption }, captionFirstOrNot, selectedNode)
      // ------------------------------------------------
    } else {
      const src = _.getNodeById('new_audio').value
      deploy.audioFigure({ src, caption }, captionFirstOrNot, selectedNode)
      // ------------------------------------------------
    }
  } else if (value === 'blockquote') {
    const cite = _.getNodeById('new_bq_cite').value
    const text = _.getNodeById('new_bq_content').value
    deploy.blockQuote(cite, text, selectedNode)
    // ------------------------------------------------
  } else if (['br', 'hr'].includes(value)) {
    deploy.lineBreaker(value, selectedNode)
    // ------------------------------------------------
  }
})
// initialize
element_form_box.appendChild(forms.createBlockForm())
