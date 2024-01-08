import {
  addNewStack,
  selectedNode,
  addTableStack,
  addListStack,
  addSelectionStack,
  addFigureStack,
} from '../stackTree.js'
import Document from '../dom/index.js'

const _ = Document()

function deployBlock(text, addBeforeOrAfter) {
  const id = `div_${new Date().getTime()}`
  const div = _.createElement('div', text, [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([div], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [div])
  }

  return addNewStack(id, `block ${text?.slice(0, 5)}...`)
}

function deployImage(src, alt, addBeforeOrAfter) {
  const id = `img_${new Date().getTime()}`
  const img = _.createImage(src, alt || `image No . ${time}`, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([img], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [img])
  }
  return addNewStack(id, `image ${alt?.slice(0, 5)}...`)
}

function deployHeading(type, text, addBeforeOrAfter) {
  const id = `header_${new Date().getTime()}`
  const header = _.createHeading(type, text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([header], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [header])
  }
  return addNewStack(id, `header ${text?.slice(0, 5)}...`)
}

function deployLink(type, url, text, title, addBeforeOrAfter) {
  const id = `link_${new Date().getTime()}`
  const link = _.createAnchor(type, text, url, [], id, title)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([link], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [link])
  }
  return addNewStack(id, `link ${url?.slice(0, 5)}...`)
}

function deployParagraph(text, addBeforeOrAfter) {
  const id = `paragraph_${new Date().getTime()}`
  const p = _.createElement('p', text, [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([p], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [p])
  }
  return addNewStack(id, `paragraph ${text?.slice(0, 5)}...`)
}

function deployList(type, lists, addBeforeOrAfter) {
  const id = `list_${new Date().getTime()}`
  const list = _.createList(type, [], id, [...lists])
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([list], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [list])
  }
  return addListStack(type, id, lists)
}

function deployText(text, addBeforeOrAfter) {
  const id = `span_${new Date().getTime()}`
  const span = _.createSpan(text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([span], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [span])
  }
  return addNewStack(id, `span ${text}, .....`)
}

function deployTable(thData, tbData, tfData, addBeforeOrAfter) {
  // createTable is under construction - - - - - -
  const id = `table_${new Date().getTime()}`
  const tHeader = _.createTHead([], thData.data, thData.thId, thData.trId)
  const tBody = _.createTBody([], tbData.data, tbData.tbId)
  const tFooter = _.createTFoot([], tfData.data, tfData.tfId, tfData.trId)
  const table = _.createElement('table', '', [], [tHeader, tBody, tFooter], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([table], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [table])
  }
  return addTableStack(id, thData, tbData, tfData)
}

function deploySelection(options, addBeforeOrAfter) {
  const id = `selection_${new Date().getTime()}`
  const select = _.createSelect([], '', options, id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([select], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [select])
  }
  return addSelectionStack(id, options)
}

function deployOption(value, text, addBeforeOrAfter) {
  const id = `option_${new Date().getTime()}`
  const option = _.createOption('', value, text, id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([option], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [option])
  }
  return addNewStack(id, `option ${text}, .....`)
}

function deployButton(text, addBeforeOrAfter) {
  const id = `button_${new Date().getTime()}`
  const button = _.createButton(text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([button], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [button])
  }
  return addNewStack(id, `button ${text}, .....`)
}

function deployLineBreaker(type, addBeforeOrAfter) {
  const id = `${type}_${new Date().getTime()}`
  const breaker = _.createElement(type, '', [], [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([breaker], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [breaker])
  }
  return addNewStack(id, `breaker ${type}, .....`)
}

function deployImageFigureBox(data, captionFirstOrNot, addBeforeOrAfter) {
  const imgId = `img_${new Date().getTime()}`
  const image = _.createImage(data.src, data.alt, [], imgId)
  const stackTraces = []
  const fragment = _.createFragment()
  if (data.caption) {
    const captionId = `caption_${new Date().getTime()}`
    const caption = _.createFigCaption(data.caption, [], captionId)
    if (captionFirstOrNot.checked) {
      _.appendChildrenTo(fragment, [caption, image])
      stackTraces.push(captionId, 'caption', imgId, 'image')
    } else {
      stackTraces.push(imgId, 'image', captionId, 'caption')
      _.appendChildrenTo(fragment, [image, caption])
    }
  } else {
    stackTraces.push(imgId, 'image')
    fragment.appendChild(image)
  }

  const id = `figure_img_${new Date().getTime()}`
  const figure = _.createElement('figure', '', [], [fragment], id)
  stackTraces.unshift(id, 'figure_image')
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([figure], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [figure])
  }

  return addFigureStack(stackTraces)
}

function deployAudioFigureBox(data, captionFirstOrNot, addBeforeOrAfter) {
  const audioId = `audio_${new Date().getTime()}`
  const audio = _.createAudio(data.src, [], audioId)
  const fragment = _.createFragment()
  const stackTraces = []
  if (data.caption) {
    const capId = `caption_${new Date().getTime()}`
    const caption = _.createFigCaption(data.caption, [], capId)
    if (captionFirstOrNot.checked) {
      _.appendChildrenTo(fragment, [caption, audio])
      stackTraces.push(capId, 'caption', audioId, 'audio')
    } else {
      stackTraces.push(audioId, 'audio', capId, 'caption')
      _.appendChildrenTo(fragment, [audio, caption])
    }
  } else {
    stackTraces.push(audioId, 'audio')
    fragment.appendChild(audio)
  }
  const id = `figure_audio_${new Date().getTime()}`
  const figure = _.createElement('figure', '', [], [fragment], id)
  stackTraces.unshift(id, 'figure_audio')
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([figure], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [figure])
  }
  return addFigureStack(stackTraces)
}

function deployBlockQuote(cite, text, addBeforeOrAfter) {
  const id = `blockquote_${new Date().getTime()}`
  const bq = _.createBlockQuote(cite, text, [], id)
  if (addBeforeOrAfter.checked && selectedNode !== '#app') {
    _.insertBefore([bq], selectedNode)
  } else {
    _.appendChildrenTo(selectedNode, [bq])
  }
  return addNewStack(id, `blockquote ${text}, .....`)
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
  deployOption,
  deployImageFigureBox,
  deployAudioFigureBox,
  deployButton,
  deployLineBreaker,
  deployBlockQuote,
}
