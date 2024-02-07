'use strict'

import _ from './dom/index.js'
import notifier from './notify.js'
import { pointOutTheEle, selectedNode } from './stackTree.js'
import {
  unitSelectors,
  StylerBoxCreator,
} from './stylesHelpers/stylerBoxCreator.js'
import { saveCusStyle, customStyles } from './stylesHelpers/customStyles.js'
import { saveAnimationsStyle, animations } from './stylesHelpers/animations.js'
import {
  buildAnimationCssString,
  buildClassNamesString,
  buildCustomStylesString,
  buildPredefinedStylesString,
} from './stylesHelpers/buildCss.js'
import {
  changePredStyle,
  predefinedStyles,
} from './stylesHelpers/predefinedStyles.js'
import { classNames, saveCNStyle } from './stylesHelpers/classNameStyles.js'
import createStyleInfoBox from './stylesHelpers/styleInfoBoxes.js'
import { lockBtn } from './helpers/lockBtn.js'
import { createConfigureBox } from './stylesHelpers/configStyling.js'

const stylesBoxChooser = _.getNodeById('styles_box_chooser')
const stylesBoxHolder = _.getNode('.stylers')
const media_chooser = _.getNodeById('style_screen_chooser')
const pseudo_class_chooser = _.getNodeById('style_pseudo_class_chooser')
const style_combinator = _.getNodeById('style_combinator')
const pseudo_effect_on = _.getNodeById('pseudo_effect_on')
const switch_css_mode_chooser = _.getNodeById('switch_css_mode')
const apply_styles_btn = _.getNodeById('apply_all_styles')
const styles_config_btn = _.getNodeById('styles_config_btn')

const animationStyleTag = _.getNodeById('my_animations')
const predefinedStyleTag = _.getNodeById('my_predefined_styles')
const customStyleTag = _.getNodeById('my_custom_styles')
const classNameStyleTag = _.getNodeById('my_className_styles')

const stylerBoxCreator = new StylerBoxCreator(_, changeAppliedStyes)
let isStyleChanged = false
let isAnimationChanged = false
let isPredefinedStylesChanged = false
let isCustomStylesChanged = false
let isClassNamesChanged = false

function handleStylerBoxes() {
  const sizingBox = stylerBoxCreator.createSizingForm()
  let positionBox
  let typographyBox
  let backgroundBox
  let bNOBox
  let miscellaneousBox
  let displayBox
  let animationBox

  _.appendChildrenTo(stylesBoxHolder, [unitSelectors, sizingBox])

  return (e) => {
    const type = e.target.value
    let box

    switch (type) {
      case 'sizing':
        box = sizingBox
        break
      case 'position':
        box = positionBox ||= stylerBoxCreator.createPositionForm()
        break
      case 'typography':
        box = typographyBox ||= stylerBoxCreator.createTypographyForm()
        break
      case 'background':
        box = backgroundBox ||= stylerBoxCreator.createBackgroundForm()
        break
      case 'border_n_outlines':
        box = bNOBox ||= stylerBoxCreator.createBorderAndOutlinesForm()
        break
      case 'display':
        box = displayBox ||= stylerBoxCreator.createDisplayForm()
        break
      case 'animation':
        animationBox ||= stylerBoxCreator.createAnimationForm()
        const select = animationBox.querySelector('#cs_ani_name')
        select.innerHTML = ''
        for (const animation in animations) {
          _.createOption(select, animation, animation)
        }
        box = animationBox
        break
      default:
        box = miscellaneousBox ||= stylerBoxCreator.createMiscellaneousForm()
    }
    _.getNode('.styler-box').replaceWith(box)
  }
}

const handleBoxChange = handleStylerBoxes()

_.on('change', stylesBoxChooser, handleBoxChange)

// styler box end

async function appliedLatestStyles() {
  if (isAnimationChanged) {
    animationStyleTag.textContent = await buildAnimationCssString(animations)
    isAnimationChanged = false // flag not to update
  }

  if (isPredefinedStylesChanged) {
    predefinedStyleTag.textContent = await buildPredefinedStylesString(
      predefinedStyles
    )
    isPredefinedStylesChanged = false // flag not to update
  }

  if (isCustomStylesChanged) {
    customStyleTag.textContent = await buildCustomStylesString(customStyles)
    isCustomStylesChanged = false // flag not to update
  }

  if (isClassNamesChanged) {
    classNameStyleTag.textContent = await buildClassNamesString(classNames)
    isClassNamesChanged = false // flag not to update
  }

  apply_styles_btn.textContent = '. Done .'
  let timerId = setTimeout(() => {
    apply_styles_btn.textContent = 'apply all'
    apply_styles_btn.disabled = false
  }, 1000)
  pointOutTheEle(selectedNode)
  return () => clearTimeout(timerId)
}

_.on('click', apply_styles_btn, (e) => {
  e.preventDefault()
  if (!isStyleChanged) {
    notifier.on('noUpdate')
    return
  }
  apply_styles_btn.disabled = true
  isStyleChanged = false
  apply_styles_btn.textContent = 'Applying .'
  appliedLatestStyles()
})

_.on('change', switch_css_mode_chooser, (e) => {
  e.preventDefault()
  const mode = e.target.value
  if (mode === 'normal') {
    createStyleInfoBox.targetStyleInfoBox(selectedNode)
  } else if (mode === 'animation') {
    createStyleInfoBox.animationBox()
  } else if (mode === 'predefined') {
    createStyleInfoBox.predefinedStylesBox('all')
  } else {
    createStyleInfoBox.classNamesBox()
  }
})
// ----------- styling mode end

function changeAppliedStyes(key, value) {
  const mode = switch_css_mode_chooser.value
  const media = media_chooser.value
  const condition = pseudo_class_chooser.value

  if (mode === 'animation') {
    setAnimationStyle(key, value)
  } else if (mode === 'normal') {
    setCustomStyle(media, condition, key, value)
  } else if (mode === 'predefined') {
    setPredStyle(condition, key, value)
  } else {
    setClassNameStyle(media, condition, key, value)
  }
  isStyleChanged = true
}

function setAnimationStyle(key, value) {
  if (key === 'animation') {
    notifier.on('invalidInput')
    return
  }
  const name = _.getNodeById('cs_animation_list').value
  if (!name) {
    notifier.on('noSelectedAnimation')
    return
  }
  const validKeyFrame = Math.max(
    Math.min(
      parseInt(_.getNodeById('cs_add_animation_kf_selector').value),
      100
    ),
    0
  ).toString()
  saveAnimationsStyle(name, parseInt(validKeyFrame), key, value)
  isAnimationChanged = true // flag to update
}

function setPredStyle(condition, key, value) {
  const ele = _.getNodeById('predefined_element').value
  changePredStyle(ele, condition, key, value)
  isPredefinedStylesChanged = true // flag to update
}

function setClassNameStyle(media, condition, key, value) {
  const name = _.getNodeById('class_name_list').value
  const interceptor = pseudo_effect_on.value || 'self'
  const combinator = style_combinator.value
  let consumer = ''
  if (condition === 'standard' || interceptor === 'self') {
    consumer = 'self'
  } else {
    consumer = `${combinator}${interceptor}`
  }
  if (!name) {
    notifier.on('noSelectedCN')
    return
  }
  saveCNStyle(name, media, condition, consumer, key, value)
  isClassNamesChanged = true // flag to update
}

function setCustomStyle(media, condition, key, value) {
  saveCusStyle(selectedNode, media, condition, key, value)
  isCustomStylesChanged = true // flag to update
}

// configure media-queries( && styling for more to come --)
let configBoxEvtCleaner = null
_.on('click', styles_config_btn, (e) => {
  e.preventDefault()
  lockBtn(styles_config_btn)
  const existed = _.getNode('.styling-config-wrapper')
  if (existed) {
    configBoxEvtCleaner()
    existed.remove()
    configBoxEvtCleaner = null
  } else {
    const [box, cleaner] = createConfigureBox()
    _.appendChild(box)
    configBoxEvtCleaner = cleaner
  }
})
// initialize styled information
createStyleInfoBox.targetStyleInfoBox('#app')

export default 'styler joined'
