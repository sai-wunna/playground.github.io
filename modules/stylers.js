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

const stylesBoxChooser = _.getNode('#styles_box_chooser')
const stylesBoxHolder = _.getNode('.stylers')
const media_chooser = _.getNode('#style_screen_chooser')
const pseudo_class_chooser = _.getNode('#style_pseudo_class_chooser')
const switch_css_mode_chooser = _.getNode('#switch_css_mode')
const save_media_styles = _.getNode('#save_media_styles')

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
  _.getNode('.styler-box')?.remove()
  let box

  switch (type) {
    case 'sizing':
      box = sizingBox
      break
    case 'position':
      box = positionBox || (positionBox = createPositionForm())
      break
    case 'typography':
      box = typographyBox || (typographyBox = createTypographyForm())
      break
    case 'background':
      box = backgroundBox || (backgroundBox = createBackgroundForm())
      break
    case 'border_n_outlines':
      box = bNOBox || (bNOBox = createBorderAndOutlinesForm())
      break
    case 'display':
      box = displayBox || (displayBox = createDisplayForm())
      break
    case 'animation':
      animationBox ||= createAnimationForm()
      const select = animationBox.querySelector('#cs_ani_name')
      select.innerHTML = ''
      for (let animation in animations) {
        _.createOption(select, animation, animation)
      }
      box = animationBox
      break
    default:
      box = miscellaneousBox || (miscellaneousBox = createMiscellaneousForm())
  }

  stylesBoxHolder.appendChild(box)
})

_.on('click', save_media_styles, (e) => {
  e.preventDefault()
  if (!isStyleChanged) {
    alert.alertMe('noUpdate')
    return
  }
  save_media_styles.disabled = true
  isStyleChanged = false
  save_media_styles.textContent = 'Applying .'
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
    const name = _.getNode('#cs_animation_list').value
    if (!name) {
      alert.alertMe('noSelectedAnimation')
      return
    }
    saveAnimationsStyle(
      name,
      Math.max(
        Math.min(
          parseInt(_.getNode('#cs_add_animation_kf_selector').value),
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
    const ele = _.getNode('#predefined_element').value
    changePredStyle(ele, condition, key, value)
  } else {
    const name = _.getNode('#class_name_list').value
    if (!name) {
      alert.alertMe('noSelectedCN')
      return
    }
    saveCNStyle(name, media, condition, key, value)
  }
  isStyleChanged = true
}

function appliedLatestStyles(animations, predefined, classNames, customStyles) {
  _.getNode('#my_styles').textContent = buildCss(
    animations,
    predefined,
    classNames,
    customStyles
  )
  save_media_styles.textContent = '. Done .'
  let timerId = setTimeout(() => {
    save_media_styles.textContent = 'apply all'
    save_media_styles.disabled = false
  }, 1000)
  pointOutTheEle(selectedNode)
  return () => clearTimeout(timerId)
}

function setIsStyleChanged(boo) {
  isStyleChanged = boo
}

// initial load to page ___________
stylesBoxHolder.appendChild(sizingBox)
createTargetStyleInfoBox('#app')

export { changeAppliedStyes, setIsStyleChanged }
