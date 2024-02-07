'use strict'
import errImgReloader from './helpers/imgReloader.js'

class DeployElement {
  constructor(
    doc,
    addNewStack,
    addTableStack,
    addListStack,
    addSelectionStack,
    addFigureStack,
    isInsertBefore
  ) {
    this._ = doc
    this.addNewStack = addNewStack
    this.addTableStack = addTableStack
    this.addListStack = addListStack
    this.addSelectionStack = addSelectionStack
    this.addFigureStack = addFigureStack
    this.isInsertBefore = isInsertBefore
  }

  #pushToDoc(target, ele) {
    if (this.isInsertBefore.checked && target !== '#app') {
      this._.insertBefore([ele], target)
    } else {
      this._.appendChildrenTo(target, [ele])
    }
  }

  block(text, target) {
    const id = `div_${new Date().getTime()}`
    const div = this._.createElement('div', text, [], [], id)
    this.#pushToDoc(target, div)
    this.addNewStack(id, `block ${text?.slice(0, 5)}...`)
  }

  image(src, alt, target) {
    const id = `img_${new Date().getTime()}`
    const img = this._.createImage(src, alt || `image`, [], id)
    // in case of error , click to reload
    errImgReloader(img, src, alt)
    this.#pushToDoc(target, img)
    this.addNewStack(id, `image ${alt?.slice(0, 5)}...`)
  }

  heading(type, text, target) {
    const id = `header_${new Date().getTime()}`
    const header = this._.createHeading(type, text, [], id)
    this.#pushToDoc(target, header)
    this.addNewStack(id, `header ${text?.slice(0, 5)}...`)
  }

  link(type, url, text, title, target) {
    const id = `link_${new Date().getTime()}`
    const link = this._.createAnchor(type, text, url, [], id, title)
    this.#pushToDoc(target, link)
    this.addNewStack(id, `link ${url?.slice(0, 5)}...`)
  }

  paragraph(text, target) {
    const id = `paragraph_${new Date().getTime()}`
    const p = this._.createElement('p', text, [], [], id)
    this.#pushToDoc(target, p)
    this.addNewStack(id, `paragraph ${text?.slice(0, 5)}...`)
  }

  list(type, lists, target) {
    const id = `list_${new Date().getTime()}`
    const list = this._.createList(type, [], id, [...lists])
    this.#pushToDoc(target, list)
    this.addListStack(type, id, lists)
  }

  text(text, target) {
    const id = `span_${new Date().getTime()}`
    const span = this._.createSpan(text, [], id)
    this.#pushToDoc(target, span)
    this.addNewStack(id, `span ${text}, .....`)
  }

  table(thData, tbData, tfData, target) {
    // createTable is under construction - - - - - -
    const id = `table_${new Date().getTime()}`
    const tHeader = this._.createTHead(
      [],
      thData.data,
      thData.thId,
      thData.trId
    )
    const tBody = this._.createTBody([], tbData.data, tbData.tbId)
    const tFooter = this._.createTFoot(
      [],
      tfData.data,
      tfData.tfId,
      tfData.trId
    )
    const table = this._.createElement(
      'table',
      '',
      [],
      [tHeader, tBody, tFooter],
      id
    )
    this.#pushToDoc(target, table)
    this.addTableStack(id, thData, tbData, tfData)
  }

  selection(options, target) {
    const id = `selection_${new Date().getTime()}`
    const select = this._.createSelect([], '', options, id)
    this.#pushToDoc(target, select)
    this.addSelectionStack(id, options)
  }

  option(value, text, target) {
    const id = `option_${new Date().getTime()}`
    const option = this._.createOption('', value, text, id)
    this.#pushToDoc(target, option)
    this.addNewStack(id, `option ${text}, .....`)
  }

  button(text, target) {
    const id = `button_${new Date().getTime()}`
    const button = this._.createButton(text, [], id)
    this.#pushToDoc(target, button)
    this.addNewStack(id, `button ${text}, .....`)
  }

  lineBreaker(type, target) {
    const id = `${type}_${new Date().getTime()}`
    const breaker = this._.createElement(type, '', [], [], id)
    this.#pushToDoc(target, breaker)
    this.addNewStack(id, `breaker ${type}, .....`)
  }

  imageFigure(data, captionFirstOrNot, target) {
    const imgId = `img_${new Date().getTime()}`
    const image = this._.createImage(data.src, data.alt, [], imgId)
    // in case of error , click to reload
    errImgReloader(image, data.src, data.alt)
    const stackTraces = []
    const fragment = this._.createFragment()
    if (data.caption) {
      const captionId = `caption_${new Date().getTime()}`
      const caption = this._.createFigCaption(data.caption, [], captionId)
      if (captionFirstOrNot.checked) {
        this._.appendChildrenTo(fragment, [caption, image])
        stackTraces.push(captionId, 'caption', imgId, 'image')
      } else {
        stackTraces.push(imgId, 'image', captionId, 'caption')
        this._.appendChildrenTo(fragment, [image, caption])
      }
    } else {
      stackTraces.push(imgId, 'image')
      fragment.appendChild(image)
    }

    const id = `figure_img_${new Date().getTime()}`
    const figure = this._.createElement('figure', '', [], [fragment], id)
    stackTraces.unshift(id, 'figure_image')

    this.#pushToDoc(target, figure)
    this.addFigureStack(stackTraces)
  }

  audioFigure(data, captionFirstOrNot, target) {
    const audioId = `audio_${new Date().getTime()}`
    const audio = this._.createAudio(data.src, [], audioId)
    const fragment = this._.createFragment()
    const stackTraces = []
    if (data.caption) {
      const capId = `caption_${new Date().getTime()}`
      const caption = this._.createFigCaption(data.caption, [], capId)
      if (captionFirstOrNot.checked) {
        this._.appendChildrenTo(fragment, [caption, audio])
        stackTraces.push(capId, 'caption', audioId, 'audio')
      } else {
        stackTraces.push(audioId, 'audio', capId, 'caption')
        this._.appendChildrenTo(fragment, [audio, caption])
      }
    } else {
      stackTraces.push(audioId, 'audio')
      fragment.appendChild(audio)
    }
    const id = `figure_audio_${new Date().getTime()}`
    const figure = this._.createElement('figure', '', [], [fragment], id)
    stackTraces.unshift(id, 'figure_audio')

    this.#pushToDoc(target, figure)
    this.addFigureStack(stackTraces)
  }

  blockQuote(cite, text, target) {
    const id = `blockquote_${new Date().getTime()}`
    const bq = this._.createBlockQuote(cite, text, [], id)
    this.#pushToDoc(target, bq)
    this.addNewStack(id, `blockquote ${text}, .....`)
  }
}

export default (
  doc,
  addNewStack,
  addTableStack,
  addListStack,
  addSelectionStack,
  addFigureStack,
  isInsertBefore
) =>
  new DeployElement(
    doc,
    addNewStack,
    addTableStack,
    addListStack,
    addSelectionStack,
    addFigureStack,
    isInsertBefore
  )
