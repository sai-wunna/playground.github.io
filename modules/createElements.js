import Document from './dom/index.js'
import Alert from './alert.js'
import {
  deployAudioFigureBox,
  deployBlock,
  deployBlockQuote,
  deployButton,
  deployHeading,
  deployImage,
  deployImageFigureBox,
  deployLineBreaker,
  deployLink,
  deployList,
  deployOption,
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
import CEF from './cefHelpers/createElementForms.js'
import { lockBtn } from './helpers/lockBtn.js'
import Validator from './validators/index.js'

const _ = Document()
const validator = Validator()
const alert = Alert()
const forms = CEF()

const selectElementBtn = _.getNode('.elements-selection')
const add_element_btn = _.getNode('#add_element_btn')
const element_form_box = _.getNode('.element-form')
const addBeforeOrAfter = _.getNode('#beforeOrAfter')

// ------------------------- select and add -------------------

_.on('change', selectElementBtn, (e) => {
  e.preventDefault()
  const value = e.target.value
  _.getNode('#add_form').remove()
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
  lockBtn(add_element_btn, 3000)
  const value = selectElementBtn.value

  if (validator.isInvalidInsert(selectedNode, value)) {
    alert.alertMe('unAppendAble')
    return
  }
  if (value === 'block') {
    const text = _.getNode('#new_block').value
    deployBlock(text, addBeforeOrAfter)
  } else if (value === 'image') {
    const src = _.getNode('#new_image').value
    const alt = _.getNode('#new_alt').value
    deployImage(src, alt, addBeforeOrAfter)
  } else if (value === 'heading') {
    const type = _.getNode('#new_header').value
    const text = _.getNode('#new_h_content').value
    deployHeading(type, text, addBeforeOrAfter)
  } else if (value === 'link') {
    const url = _.getNode('#new_link').value.split(' ').join('')
    const type = _.getNode('#link_type').value
    const text = _.getNode('#new_link_name').value
    const title = _.getNode('#new_title').value
    deployLink(type, url, text, title, addBeforeOrAfter)
  } else if (value === 'paragraph') {
    const text = _.getNode('#new_para').value
    deployParagraph(text, addBeforeOrAfter)
  } else if (value === 'list') {
    const type = _.getNode('#list_type').value
    let lists = []
    _.getAllNodes('.list-value').forEach((item) => {
      lists.push(item.value)
    })
    lists = manageListData(lists)
    deployList(type, lists, addBeforeOrAfter)
  } else if (value === 'span') {
    const text = _.getNode('#new_text').value
    deployText(text, addBeforeOrAfter)
  } else if (value === 'table') {
    const hData = []
    const bData = []
    const fData = []
    _.getAllNodes('.c-t-h-cell').forEach((cell) => hData.push(cell.value))
    _.getAllNodes('.c-t-b-cell').forEach((cell) => bData.push(cell.value))
    _.getAllNodes('.c-t-f-cell').forEach((cell) => fData.push(cell.value))
    const [thData, tbData, tfData] = manageTData(hData, bData, fData)
    deployTable(thData, tbData, tfData, addBeforeOrAfter)
  } else if (value === 'selection') {
    const options = []
    const values = []
    _.getAllNodes('.option-data').forEach((opt) => options.push(opt.value))
    _.getAllNodes('.option-value').forEach((value) => values.push(value.value))
    deploySelection(manageSelectData(options, values), addBeforeOrAfter)
  } else if (value === 'option') {
    const optValue = _.getNode('#new_opt_value').value
    const optText = _.getNode('#new_opt_text').value
    deployOption(optValue, optText, addBeforeOrAfter)
  } else if (value === 'button') {
    deployButton(_.getNode('#new_button').value, addBeforeOrAfter)
  } else if (value === 'figure') {
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
  } else if (value === 'blockquote') {
    const cite = _.getNode('#new_bq_cite').value
    const text = _.getNode('#new_bq_content').value
    deployBlockQuote(cite, text, addBeforeOrAfter)
  } else if (['br', 'hr'].includes(value)) {
    deployLineBreaker(value, addBeforeOrAfter)
  }
})
// initialize
element_form_box.appendChild(forms.createBlockForm())
