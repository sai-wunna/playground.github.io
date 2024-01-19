import Document from './dom/index.js'
import { pointOutTheEle, selectedNode } from './stackTree.js'
import Alert from './alert.js'
import {
  createBackgroundForm,
  createBorderAndOutlinesForm,
  createPositionForm,
  createSizingForm,
  createTypographyForm,
  createDisplayForm,
  createMiscellaneousForm,
  createAnimationForm,
  unitSelectors,
} from './stylesHelpers/stylerBoxCreator.js'
import { saveCusStyle, customStyles } from './stylesHelpers/customStyles.js'
import { saveAnimationsStyle, animations } from './stylesHelpers/animations.js'
import { buildCss } from './stylesHelpers/buildCss.js'
import {
  createAnimationsBox,
  createClassNamesBox,
  createPredefinedStylesBox,
  createTargetStyleInfoBox,
} from './stylesHelpers/styleInfoBoxes.js'
import {
  changePredStyle,
  predefinedStyles,
} from './stylesHelpers/predefinedStyles.js'
import { classNames, saveCNStyle } from './stylesHelpers/classNameStyles .js'

const _ = Document()
const alert = Alert()

const stylesBoxChooser = _.getNodeById('styles_box_chooser')
const stylesBoxHolder = _.getNode('.stylers')
const media_chooser = _.getNodeById('style_screen_chooser')
const pseudo_class_chooser = _.getNodeById('style_pseudo_class_chooser')
const switch_css_mode_chooser = _.getNodeById('switch_css_mode')
const save_styles_btn = _.getNodeById('save_media_styles')

let isStyleChanged = false
const sizingBox = createSizingForm()
let positionBox
let typographyBox
let backgroundBox
let bNOBox
let miscellaneousBox
let displayBox
let animationBox

_.on('change', stylesBoxChooser, (e) => {
  const type = e.target.value
  let box

  switch (type) {
    case 'sizing':
      box = sizingBox
      break
    case 'position':
      box = positionBox ||= createPositionForm()
      break
    case 'typography':
      box = typographyBox ||= createTypographyForm()
      break
    case 'background':
      box = backgroundBox ||= createBackgroundForm()
      break
    case 'border_n_outlines':
      box = bNOBox ||= createBorderAndOutlinesForm()
      break
    case 'display':
      box = displayBox ||= createDisplayForm()
      break
    case 'animation':
      animationBox ||= createAnimationForm()
      const select = animationBox.querySelector('#cs_ani_name')
      select.innerHTML = ''
      for (const [animation, _] in Object.entries(animations)) {
        _.createOption(select, animation, animation)
      }
      box = animationBox
      break
    default:
      box = miscellaneousBox ||= createMiscellaneousForm()
  }
  _.getNode('.styler-box').replaceWith(box)
})

_.on('click', save_styles_btn, (e) => {
  e.preventDefault()
  if (!isStyleChanged) {
    alert.alertMe('noUpdate')
    return
  }
  save_styles_btn.disabled = true
  isStyleChanged = false
  save_styles_btn.textContent = 'Applying .'
  appliedLatestStyles(animations, predefinedStyles, classNames, customStyles)
})

// ----------- for styling mode

_.on('change', switch_css_mode_chooser, (e) => {
  e.preventDefault()
  const mode = e.target.value
  if (mode === 'normal') {
    createTargetStyleInfoBox(selectedNode)
  } else if (mode === 'animation') {
    createAnimationsBox()
  } else if (mode === 'predefined') {
    createPredefinedStylesBox('button')
  } else {
    createClassNamesBox()
  }
})

function changeAppliedStyes(key, value) {
  const mode = switch_css_mode_chooser.value
  const media = media_chooser.value
  const condition = pseudo_class_chooser.value

  if (mode === 'animation') {
    if (key === 'animation') {
      alert.alertMe('invalidInput')
      return
    }
    const name = _.getNodeById('cs_animation_list').value
    if (!name) {
      alert.alertMe('noSelectedAnimation')
      return
    }
    saveAnimationsStyle(
      name,
      Math.max(
        Math.min(
          parseInt(_.getNodeById('cs_add_animation_kf_selector').value),
          100
        ),
        0
      ).toString(),
      key,
      value
    )
  } else if (mode === 'normal') {
    saveCusStyle(selectedNode, media, condition, key, value)
  } else if (mode === 'predefined') {
    const ele = _.getNodeById('predefined_element').value
    changePredStyle(ele, condition, key, value)
  } else {
    const name = _.getNodeById('class_name_list').value
    if (!name) {
      alert.alertMe('noSelectedCN')
      return
    }
    saveCNStyle(name, media, condition, key, value)
  }
  isStyleChanged = true
}

function appliedLatestStyles(animations, predefined, classNames, customStyles) {
  _.getNodeById('my_styles').textContent = buildCss(
    animations,
    predefined,
    classNames,
    customStyles
  )
  save_styles_btn.textContent = '. Done .'
  let timerId = setTimeout(() => {
    save_styles_btn.textContent = 'apply all'
    save_styles_btn.disabled = false
  }, 1000)
  pointOutTheEle(selectedNode)
  return () => clearTimeout(timerId)
}

// initial load to page ___________
_.appendChildrenTo(stylesBoxHolder, [unitSelectors, sizingBox])
createTargetStyleInfoBox('#app')

export { changeAppliedStyes }
