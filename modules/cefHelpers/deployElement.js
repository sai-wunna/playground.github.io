import {
  elementsCounter,
  addNewStack,
  selectedNode,
  addTableStack,
  addListStack,
  addSelectionStack,
  addFigureStack,
} from '../../main.js'
import {
  appendChildrenTo,
  createAnchor,
  createAudio,
  createButton,
  createElement,
  createFigCaption,
  createFragment,
  createHeading,
  createImage,
  createList,
  createSelect,
  createSpan,
  createTBody,
  createTFoot,
  createTHead,
  insertBefore,
} from '../dom/dom.js'

function deployBlock(text, addBeforeOrAfter) {
  const time = elementsCounter.block + 1
  const id = `div_${new Date().getTime()}`
  const div = createElement('div', text, [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([div], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [div])
  }

  return addNewStack(id, `block ${time}, ${text?.slice(0, 5)}...`)
}

function deployImage(src, alt, addBeforeOrAfter) {
  const time = elementsCounter.image + 1
  const id = `img_${new Date().getTime()}`
  const img = createImage(src, alt || `image No . ${time}`, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([img], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [img])
  }
  return addNewStack(id, `image ${time}, ${alt?.slice(0, 5)}...`)
}

function deployHeading(type, text, addBeforeOrAfter) {
  const time = elementsCounter.header + 1
  const id = `header_${new Date().getTime()}`
  const header = createHeading(type, text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([header], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [header])
  }
  return addNewStack(id, `header ${time}, ${text?.slice(0, 5)}...`)
}

function deployLink(type, url, text, title, addBeforeOrAfter) {
  const time = elementsCounter.link + 1
  const id = `link_${new Date().getTime()}`
  const link = createAnchor(type, text, url, [], id, title)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([link], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [link])
  }
  return addNewStack(id, `link ${time}, ${url?.slice(0, 5)}...`)
}

function deployParagraph(text, addBeforeOrAfter) {
  const time = elementsCounter.paragraph + 1
  const id = `paragraph_${new Date().getTime()}`
  const p = createElement('p', text, [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([p], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [p])
  }
  return addNewStack(id, `paragraph ${time}, ${text?.slice(0, 5)}...`)
}

function deployList(type, lists, addBeforeOrAfter) {
  const id = `list_${new Date().getTime()}`
  const list = createList(type, [], id, [...lists])
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([list], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [list])
  }
  return addListStack(type, id, lists)
}

function deployText(text, addBeforeOrAfter) {
  const time = elementsCounter.span + 1
  const id = `span_${new Date().getTime()}`
  const span = createSpan(text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([span], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [span])
  }
  return addNewStack(id, `span ${time}, .....`)
}

function deployTable(thData, tbData, tfData, addBeforeOrAfter) {
  // createTable is under construction - - - - - -
  const id = `table_${new Date().getTime()}`
  const tHeader = createTHead([], thData.data, thData.thId, thData.trId)
  const tBody = createTBody([], tbData.data, tbData.tbId)
  const tFooter = createTFoot([], tfData.data, tfData.tfId, tfData.trId)
  const table = createElement('table', '', [], [tHeader, tBody, tFooter], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([table], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [table])
  }
  return addTableStack(id, thData, tbData, tfData)
}

function deploySelection(options, addBeforeOrAfter) {
  const id = `selection_${new Date().getTime()}`
  const select = createSelect([], options, id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([select], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [select])
  }
  return addSelectionStack(id, options)
}

function deployButton(text, addBeforeOrAfter) {
  const time = elementsCounter.button + 1
  const id = `text_${new Date().getTime()}`
  const button = createButton(text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([button], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [button])
  }
  return addNewStack(id, `button ${time}, .....`)
}

function deployLineBreaker(type, addBeforeOrAfter) {
  const time = elementsCounter.breaker + 1
  const id = `${type}_${new Date().getTime()}`
  const breaker = createElement(type, '', [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([breaker], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [breaker])
  }
  return addNewStack(id, `breaker ${type} ${time}, .....`)
}

function deployImageFigureBox(data, captionFirstOrNot, addBeforeOrAfter) {
  const imgId = `img_${new Date().getTime()}`
  const image = createImage(data.src, data.alt, [], imgId)
  const stackTraces = []
  const fragment = createFragment()
  if (data.caption) {
    const captionId = `caption_${new Date().getTime()}`
    const caption = createFigCaption(data.caption, captionId)
    if (captionFirstOrNot.checked) {
      appendChildrenTo(fragment, [caption, image])
      stackTraces.push(captionId, 'caption', imgId, 'image')
    } else {
      stackTraces.push(imgId, 'image', captionId, 'caption')
      appendChildrenTo(fragment, [image, caption])
    }
  } else {
    stackTraces.push(imgId, 'image')
    fragment.appendChild(image)
  }

  const id = `figure_img_${new Date().getTime()}`
  const figure = createElement('figure', '', [], [fragment], id)
  stackTraces.unshift(id, 'figure_image')
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([figure], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [figure])
  }

  return addFigureStack(stackTraces)
}

function deployAudioFigureBox(data, captionFirstOrNot, addBeforeOrAfter) {
  const audioId = `audio_${new Date().getTime()}`
  const audio = createAudio(data.src, audioId)
  const fragment = createFragment()
  const stackTraces = []
  if (data.caption) {
    const capId = `caption_${new Date().getTime()}`
    const caption = createFigCaption(data.caption, capId)
    if (captionFirstOrNot.checked) {
      appendChildrenTo(fragment, [caption, audio])
      stackTraces.push(capId, 'caption', audioId, 'audio')
    } else {
      stackTraces.push(audioId, 'audio', capId, 'caption')
      appendChildrenTo(fragment, [audio, caption])
    }
  } else {
    stackTraces.push(audioId, 'audio')
    fragment.appendChild(audio)
  }
  const id = `figure_audio_${new Date().getTime()}`
  const figure = createElement('figure', '', [], [fragment], id)
  stackTraces.unshift(id, 'figure_audio')
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    insertBefore([figure], selectedNode)
  } else {
    appendChildrenTo(selectedNode, [figure])
  }
  return addFigureStack(stackTraces)
}

export {
  deployBlock,
  deployImage,
  deployHeading,
  deployLink,
  deployParagraph,
  deployList,
  deployText,
  deployTable,
  deploySelection,
  deployImageFigureBox,
  deployAudioFigureBox,
  deployButton,
  deployLineBreaker,
}
