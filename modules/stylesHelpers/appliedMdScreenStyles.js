import { getNode } from '../dom/dom.js'
import { createAppliedStyleBox } from './helpers/appliedStylesBoxCreator.js'
import { createStyleInfo } from './helpers/styleInfoCreator.js'

const stylesForMdScreen = {}

function saveMdSStyleValue(group, node, key, value) {
  const existedNode = stylesForMdScreen[node]
  if (existedNode) {
    stylesForMdScreen[node][group][`${key}`] = value
  } else {
    stylesForMdScreen[node] = {
      standard: {},
      hover: {},
      focus: {},
      active: {},
    }
    stylesForMdScreen[node][group] = { [`${key}`]: value }
  }
}

function removeMdSStyleValue(group, node, key) {
  delete stylesForMdScreen[`${node}`][group][`${key}`]
}

function removeMdSStyleNode(node) {
  delete stylesForMdScreen[`${node}`]
}

function appliedMdSStylesShower(appliedNode) {
  const styles = stylesForMdScreen[appliedNode]
  getNode('.applied-styles').appendChild(
    createAppliedStyleBox('medium', appliedNode, styles, removeMdSStyleValue)
  )
}

function changeMdSAppliedStyles(group, node, key, value) {
  const appliedStyle = getNode(`#md_${group}_${key.trim()}_value`)
  if (appliedStyle) {
    appliedStyle.textContent = value
  } else {
    getNode(`.medium-screen-${group}-styles`).appendChild(
      createStyleInfo('md', group, node, key, value, removeMdSStyleValue)
    )
  }
  saveMdSStyleValue(group, node, key, value)
}

export {
  stylesForMdScreen,
  appliedMdSStylesShower,
  changeMdSAppliedStyles,
  removeMdSStyleNode,
}
