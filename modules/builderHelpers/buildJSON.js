import Document from '../dom/index.js'
import { customStyles } from '../stylesHelpers/customStyles.js'
import { classNames } from '../stylesHelpers/classNameStyles .js'
import { predefinedStyles } from '../stylesHelpers/predefinedStyles.js'
import { animations } from '../stylesHelpers/animations.js'

const _ = Document()

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

function downloadJSON(author, about, title) {
  const tree = buildVDom(_.getNodeById('app'))
  const obj = {
    tree,
    info: { author, name: about },
    styles: { customStyles, classNames, animations, predefinedStyles },
  }
  const jsonString = JSON.stringify(obj)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const downloadLink = _.createAnchor('link', '', url, '', '', title)
  downloadLink.download = `web_${title}.json` || 'download.json'

  document.body.appendChild(downloadLink)
  downloadLink.click()

  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(url)
}

export default downloadJSON
