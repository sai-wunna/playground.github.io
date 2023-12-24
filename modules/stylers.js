import { pointOutTheEle, selectedNode } from '../main.js'
import { alertMe } from './alert.js'
import { createOption, getNode, on } from './dom/dom.js'
import {
  createBackgroundBox,
  createBorderAndOutlinesBox,
  createPositionBox,
  createSizingBox,
  createTypographyBox,
  createDisplayBox,
  createMiscellaneousBox,
  createAnimationBox,
} from './stylesHelpers/stylerBoxCreator.js'
import {
  changeGrlSAppliedStyles,
  stylesForGrlScreen,
} from './stylesHelpers/appliedGrlScreenStyles.js'
import {
  changeLgSAppliedStyles,
  stylesForLgScreen,
} from './stylesHelpers/appliedLgScreenStyles.js'
import {
  changeMdSAppliedStyles,
  stylesForMdScreen,
} from './stylesHelpers/appliedMdScreenStyles.js'
import { toggleAnimationBox } from './helpers/aniNStyleNav.js'
import {
  saveAnimationsStyle,
  createAnimationForm,
  animations,
} from './stylesHelpers/animationStore.js'
import { buildCss } from './stylesHelpers/helpers/buildCss.js'

const stylesBoxChooser = getNode('#styles_box_chooser')
const stylesBoxHolder = getNode('.stylers')
const choose_media_btn = getNode('#style_screen_chooser')
const pseudo_class_chooser = getNode('#style_pseudo_class_chooser')
const switch_animations_n_styles_btn = getNode('#switch_animations_n_styles')
const save_media_styles = getNode('#save_media_styles')

let animating = false
let isStyleChanged = false
const sizingBox = createSizingBox()
let positionBox
let typographyBox
let backgroundBox
let bNOBox
let miscellaneousBox
let displayBox
let animationBox
let animationInfoBox

on('change', stylesBoxChooser, (e) => {
  const type = e.target.value
  getNode('.styler-box')?.remove()
  let box

  switch (type) {
    case 'sizing':
      box = sizingBox
      break
    case 'position':
      box = positionBox || (positionBox = createPositionBox())
      break
    case 'typography':
      box = typographyBox || (typographyBox = createTypographyBox())
      break
    case 'background':
      box = backgroundBox || (backgroundBox = createBackgroundBox())
      break
    case 'border_n_outlines':
      box = bNOBox || (bNOBox = createBorderAndOutlinesBox())
      break
    case 'display':
      box = displayBox || (displayBox = createDisplayBox())
      break
    case 'animation':
      animationBox ||= createAnimationBox()
      const select = animationBox.querySelector('#cs_ani_name')
      select.innerHTML = ''
      for (let animation in animations) {
        createOption(select, animation, animation)
      }
      box = animationBox
      break
    default:
      box = miscellaneousBox || (miscellaneousBox = createMiscellaneousBox())
  }

  stylesBoxHolder.appendChild(box)
})

on('click', save_media_styles, (e) => {
  e.preventDefault()
  if (!isStyleChanged) {
    alertMe('noUpdate')
    return
  }
  save_media_styles.disabled = true
  isStyleChanged = false
  save_media_styles.textContent = 'Applying .'
  appliedLatestStyles(
    animations,
    stylesForGrlScreen,
    stylesForMdScreen,
    stylesForLgScreen
  )
})

// ----------- for animations
on('click', switch_animations_n_styles_btn, (e) => {
  e.preventDefault()
  toggleAnimationBox(e)
  if (!animating) {
    getNode('.animation-form').appendChild(
      animationInfoBox || (animationInfoBox = createAnimationForm())
    )
  }
  animating = !animating
})

function changeAppliedStyes(key, value) {
  if (animating) {
    if (key === 'animation') {
      alertMe('invalidInput')
      return
    }
    const name = getNode('#cs_animation_list').value
    if (!name) {
      alertMe('noSelectedAnimation')
      return
    }
    saveAnimationsStyle(
      name,
      Math.max(
        Math.min(parseInt(getNode('#cs_add_animation_kf_selector').value), 100),
        0
      ).toString(),
      key,
      value
    )
  } else {
    const type = choose_media_btn.value
    const group = pseudo_class_chooser.value
    if (type === 'general') {
      changeGrlSAppliedStyles(group, selectedNode, key, value)
    } else if (type === 'medium') {
      changeMdSAppliedStyles(group, selectedNode, key, value)
    } else {
      changeLgSAppliedStyles(group, selectedNode, key, value)
    }
  }
  isStyleChanged = true
}

function appliedLatestStyles(animations, general, md, lg) {
  getNode('#my_styles').textContent = buildCss(animations, general, md, lg)
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

export { changeAppliedStyes, setIsStyleChanged }
