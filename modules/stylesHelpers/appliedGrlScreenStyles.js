import { getNode } from '../dom/dom.js'
import { createAppliedStyleBox } from './helpers/appliedStylesBoxCreator.js'
import { createStyleInfo } from './helpers/styleInfoCreator.js'
//  node : {standard: {}, hover: {}, active: {}, focus: {}}
const stylesForGrlScreen = {}

function saveSmSStyleValue(group, node, key, value) {
  const existedNode = stylesForGrlScreen[node]
  if (existedNode) {
    stylesForGrlScreen[node][group][`${key}`] = value
  } else {
    stylesForGrlScreen[node] = {
      standard: {},
      hover: {},
      focus: {},
      active: {},
    }
    stylesForGrlScreen[node][group] = { [`${key}`]: value }
  }
}

function removeGrlSStyleValue(group, node, key) {
  delete stylesForGrlScreen[`${node}`][group][`${key}`]
}

function removeGrlSStyleNode(node) {
  delete stylesForGrlScreen[`${node}`]
}

function appliedGrlSStylesShower(appliedNode) {
  const styles = stylesForGrlScreen[appliedNode]
  getNode('.applied-styles').appendChild(
    createAppliedStyleBox('general', appliedNode, styles, removeGrlSStyleValue)
  )
}

function changeGrlSAppliedStyles(group, node, key, value) {
  const appliedStyle = getNode(`#grl_${group}_${key.trim()}_value`)
  if (appliedStyle) {
    appliedStyle.textContent = value
  } else {
    getNode(`.general-screen-${group}-styles`).appendChild(
      createStyleInfo('grl', group, node, key, value, removeGrlSStyleValue)
    )
  }
  saveSmSStyleValue(group, node, key, value)
}

export {
  stylesForGrlScreen,
  appliedGrlSStylesShower,
  changeGrlSAppliedStyles,
  removeGrlSStyleNode,
}
