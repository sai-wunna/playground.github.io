'use strict'

import _ from '../dom/index.js'
import { customStyles } from '../stylesHelpers/customStyles.js'
import { classNames } from '../stylesHelpers/classNameStyles.js'
import { predefinedStyles } from '../stylesHelpers/predefinedStyles.js'
import { animations } from '../stylesHelpers/animations.js'

function buildVDom(Node) {
  if (Node && Node.nodeType === Node.TEXT_NODE) return Node.nodeValue
  const tree = { tagName: Node.tagName.toLowerCase() }

  const attrs = {}
  const attributesMap = Node.attributes
  for (let i = 0; i < attributesMap.length; i++) {
    const key = attributesMap[i].name
    const value = attributesMap[i].value
    attrs[key] = value
  }
  // add attrs
  tree.attrs = attrs

  const children = []
  const childNodes = Node.childNodes
  for (const child of childNodes) {
    children.push(buildVDom(child))
  }

  tree.children = children

  return tree
}

async function downloadJSON(author, about, title) {
  const tree = await buildVDom(_.getNodeById('app').cloneNode(true))
  const data = {
    tree,
    info: { author, name: about },
    styles: { customStyles, classNames, animations, predefinedStyles },
  }
  const jsonString = JSON.stringify(data)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const downloadLink = _.createAnchor('link', '', url, '', '', title)
  downloadLink.download = `web_${title}.json`

  _.appendChild(downloadLink)
  downloadLink.click()

  _.removeChild(downloadLink)
  URL.revokeObjectURL(url)
}

export default downloadJSON
