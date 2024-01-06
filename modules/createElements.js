import Document from './dom/index.js'
import Alert from './alert.js'
import {
  createBlockForm,
  createImageForm,
  createHeadingForm,
  createLinkForm,
  createParagraphForm,
  createListForm,
  createTextForm,
  createTableForm,
  createSelectionForm,
  createButtonForm,
  createBrForm,
  createHrForm,
  createFigureForm,
} from './cefHelpers/createElementForms.js'
import {
  deployAudioFigureBox,
  deployBlock,
  deployButton,
  deployHeading,
  deployImage,
  deployImageFigureBox,
  deployLineBreaker,
  deployLink,
  deployList,
  deployParagraph,
  deploySelection,
  deployTable,
  deployText,
} from './cefHelpers/deployElement.js'
import { selectedNode } from './stackTree.js'
import {
  manageListData,
  manageTData,
  manageSelectData,
} from './cefHelpers/manageInputData.js'
import { lockBtn } from './helpers/lockBtn.js'
import Validator from './validators/index.js'

const _ = Document()
const validator = Validator()
const alert = Alert()

const selectElementBtn = _.getNode('.elements-selection')
const add_element_btn = _.getNode('#add_element_btn')
const element_form_box = _.getNode('.element-form')
const addBeforeOrAfter = _.getNode('#beforeOrAfter')

const blockForm = createBlockForm()
let imageForm
let headerForm
let linkForm
let paragraphForm
let listForm
let textForm
let tableForm
let selectionForm
let buttonForm
let figureForm
let brForm
let hrForm
// ------------------------- select and add -------------------

_.on('change', selectElementBtn, (e) => {
  e.preventDefault()
  const value = e.target.value
  _.getNode('#add_form').remove()
  let form
  if (value === 'block') {
    form = blockForm
  } else if (value === 'image') {
    form = imageForm || (imageForm = createImageForm())
  } else if (value === 'heading') {
    form = headerForm || (headerForm = createHeadingForm())
  } else if (value === 'link') {
    form = linkForm || (linkForm = createLinkForm())
  } else if (value === 'paragraph') {
    form = paragraphForm || (paragraphForm = createParagraphForm())
  } else if (value === 'list') {
    form = listForm || (listForm = createListForm())
  } else if (value === 'span') {
    form = textForm || (textForm = createTextForm())
  } else if (value === 'table') {
    form = tableForm || (tableForm = createTableForm())
  } else if (value === 'button') {
    form = buttonForm || (buttonForm = createButtonForm())
  } else if (value === 'selection') {
    form = selectionForm || (selectionForm = createSelectionForm())
  } else if (value === 'figure') {
    form = figureForm || (figureForm = createFigureForm())
  } else if (value === 'br') {
    form = brForm || (brForm = createBrForm())
  } else {
    form = hrForm || (hrForm = createHrForm())
  }
  element_form_box.appendChild(form)
})

_.on('click', add_element_btn, (e) => {
  e.preventDefault()
  lockBtn(add_element_btn)
  if (validator.isInvalidInsert(selectedNode)) {
    alert.alertMe('unAppendAble')
    return
  }
  if (selectElementBtn.value === 'block') {
    const text = _.getNode('#new_block').value
    deployBlock(text, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'image') {
    const src = _.getNode('#new_image').value
    const alt = _.getNode('#new_alt').value
    deployImage(src, alt, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'heading') {
    const type = _.getNode('#new_header').value
    const text = _.getNode('#new_h_content').value
    deployHeading(type, text, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'link') {
    const url = _.getNode('#new_link').value.split(' ').join('')
    const type = _.getNode('#link_type').value
    const text = _.getNode('#new_link_name').value
    const title = _.getNode('#new_title').value
    deployLink(type, url, text, title, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'paragraph') {
    const text = _.getNode('#new_para').value
    deployParagraph(text, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'list') {
    const type = _.getNode('#list_type').value
    let lists = []
    _.getAllNodes('.list-value').forEach((item) => {
      lists.push(item.value)
    })
    lists = manageListData(lists)
    deployList(type, lists, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'span') {
    const text = _.getNode('#new_text').value
    deployText(text, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'table') {
    const hData = []
    const bData = []
    const fData = []
    _.getAllNodes('.c-t-h-cell').forEach((cell) => hData.push(cell.value))
    _.getAllNodes('.c-t-b-cell').forEach((cell) => bData.push(cell.value))
    _.getAllNodes('.c-t-f-cell').forEach((cell) => fData.push(cell.value))
    const [thData, tbData, tfData] = manageTData(hData, bData, fData)
    deployTable(thData, tbData, tfData, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'selection') {
    const options = []
    const values = []
    _.getAllNodes('.option-data').forEach((opt) => options.push(opt.value))
    _.getAllNodes('.option-value').forEach((value) => values.push(value.value))
    deploySelection(manageSelectData(options, values), addBeforeOrAfter)
  } else if (selectElementBtn.value === 'button') {
    deployButton(_.getNode('#new_button').value, addBeforeOrAfter)
  } else if (selectElementBtn.value === 'figure') {
    const type = _.getNode('#new_img_or_audio').value
    let caption = _.getNode('#new_caption').value
    const captionFirstOrNot = _.getNode('#caption_first_or_not')
    if (type === 'image_box') {
      const src = _.getNode('#new_image').value
      const alt = _.getNode('#new_image_alt').value
      deployImageFigureBox(
        { src, alt, caption },
        captionFirstOrNot,
        addBeforeOrAfter
      )
    } else {
      const src = _.getNode('#new_audio').value
      deployAudioFigureBox(
        { src, caption },
        captionFirstOrNot,
        addBeforeOrAfter
      )
    }
  } else if (['br', 'hr'].includes(selectElementBtn.value)) {
    deployLineBreaker(selectElementBtn.value, addBeforeOrAfter)
  }
})
// initialize
element_form_box.appendChild(blockForm)
