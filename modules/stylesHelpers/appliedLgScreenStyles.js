import { getNode } from '../dom/dom.js'
import { createAppliedStyleBox } from './helpers/appliedStylesBoxCreator.js'
import { createStyleInfo } from './helpers/styleInfoCreator.js'
//  node : {standard: {}, hover: {}, active: {}, focus: {}}
const stylesForLgScreen = {}

function saveLgSStyleValue(group, node, key, value) {
  const existedNode = stylesForLgScreen[node]
  if (existedNode) {
    stylesForLgScreen[node][group][`${key}`] = value
  } else {
    stylesForLgScreen[node] = {
      standard: {},
      hover: {},
      focus: {},
      active: {},
    }
    stylesForLgScreen[node][group] = { [`${key}`]: value }
  }
}

function removeLgSStyleValue(group, node, key) {
  delete stylesForLgScreen[`${node}`][group][`${key}`]
}

function removeLgSStyleNode(node) {
  delete stylesForLgScreen[`${node}`]
}

function appliedLgSStylesShower(appliedNode) {
  const styles = stylesForLgScreen[appliedNode]
  getNode('.applied-styles').appendChild(
    createAppliedStyleBox('large', appliedNode, styles, removeLgSStyleValue)
  )
}

function changeLgSAppliedStyles(group, node, key, value) {
  const appliedStyle = getNode(`#lg_${group}_${key.trim()}_value`)
  if (appliedStyle) {
    appliedStyle.textContent = value
  } else {
    getNode(`.large-screen-${group}-styles`).appendChild(
      createStyleInfo('lg', group, node, key, value, removeLgSStyleValue)
    )
  }
  saveLgSStyleValue(group, node, key, value)
}

export {
  stylesForLgScreen,
  appliedLgSStylesShower,
  changeLgSAppliedStyles,
  removeLgSStyleNode,
}
