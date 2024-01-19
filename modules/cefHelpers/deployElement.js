import Document from '../dom/index.js'
import errImgReloader from './helpers/imgReloader.js'
const _ = Document()

class DeployElement {
  constructor(
    addNewStack,
    addTableStack,
    addListStack,
    addSelectionStack,
    addFigureStack,
    isInsertBefore
  ) {
    this.addNewStack = addNewStack
    this.addTableStack = addTableStack
    this.addListStack = addListStack
    this.addSelectionStack = addSelectionStack
    this.addFigureStack = addFigureStack
    this.isInsertBefore = isInsertBefore
  }

  block(text, target) {
    const id = `div_${new Date().getTime()}`
    const div = _.createElement('div', text, [], [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([div], target)
    } else {
      _.appendChildrenTo(target, [div])
    }

    this.addNewStack(id, `block ${text?.slice(0, 5)}...`)
  }

  image(src, alt, target) {
    const id = `img_${new Date().getTime()}`
    const img = _.createImage(src, alt || `image No . ${time}`, [], id)
    // in case of error , click to reload
    errImgReloader(img, src, alt)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([img], target)
    } else {
      _.appendChildrenTo(target, [img])
    }
    this.addNewStack(id, `image ${alt?.slice(0, 5)}...`)
  }

  heading(type, text, target) {
    const id = `header_${new Date().getTime()}`
    const header = _.createHeading(type, text, [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([header], target)
    } else {
      _.appendChildrenTo(target, [header])
    }
    this.addNewStack(id, `header ${text?.slice(0, 5)}...`)
  }

  link(type, url, text, title, target) {
    const id = `link_${new Date().getTime()}`
    const link = _.createAnchor(type, text, url, [], id, title)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([link], target)
    } else {
      _.appendChildrenTo(target, [link])
    }
    this.addNewStack(id, `link ${url?.slice(0, 5)}...`)
  }

  paragraph(text, target) {
    const id = `paragraph_${new Date().getTime()}`
    const p = _.createElement('p', text, [], [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([p], target)
    } else {
      _.appendChildrenTo(target, [p])
    }
    this.addNewStack(id, `paragraph ${text?.slice(0, 5)}...`)
  }

  list(type, lists, target) {
    const id = `list_${new Date().getTime()}`
    const list = _.createList(type, [], id, [...lists])
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([list], target)
    } else {
      _.appendChildrenTo(target, [list])
    }
    this.addListStack(type, id, lists)
  }

  text(text, target) {
    const id = `span_${new Date().getTime()}`
    const span = _.createSpan(text, [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([span], target)
    } else {
      _.appendChildrenTo(target, [span])
    }
    this.addNewStack(id, `span ${text}, .....`)
  }

  table(thData, tbData, tfData, target) {
    // createTable is under construction - - - - - -
    const id = `table_${new Date().getTime()}`
    const tHeader = _.createTHead([], thData.data, thData.thId, thData.trId)
    const tBody = _.createTBody([], tbData.data, tbData.tbId)
    const tFooter = _.createTFoot([], tfData.data, tfData.tfId, tfData.trId)
    const table = _.createElement(
      'table',
      '',
      [],
      [tHeader, tBody, tFooter],
      id
    )
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([table], target)
    } else {
      _.appendChildrenTo(target, [table])
    }
    this.addTableStack(id, thData, tbData, tfData)
  }

  selection(options, target) {
    const id = `selection_${new Date().getTime()}`
    const select = _.createSelect([], '', options, id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([select], target)
    } else {
      _.appendChildrenTo(target, [select])
    }
    this.addSelectionStack(id, options)
  }

  option(value, text, target) {
    const id = `option_${new Date().getTime()}`
    const option = _.createOption('', value, text, id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([option], target)
    } else {
      _.appendChildrenTo(target, [option])
    }
    this.addNewStack(id, `option ${text}, .....`)
  }

  button(text, target) {
    const id = `button_${new Date().getTime()}`
    const button = _.createButton(text, [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([button], target)
    } else {
      _.appendChildrenTo(target, [button])
    }
    this.addNewStack(id, `button ${text}, .....`)
  }

  lineBreaker(type, target) {
    const id = `${type}_${new Date().getTime()}`
    const breaker = _.createElement(type, '', [], [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([breaker], target)
    } else {
      _.appendChildrenTo(target, [breaker])
    }
    this.addNewStack(id, `breaker ${type}, .....`)
  }

  imageFigure(data, captionFirstOrNot, target) {
    const imgId = `img_${new Date().getTime()}`
    const image = _.createImage(data.src, data.alt, [], imgId)
    // in case of error , click to reload
    errImgReloader(image, data.src, data.alt)
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
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([figure], target)
    } else {
      _.appendChildrenTo(target, [figure])
    }

    this.addFigureStack(stackTraces)
  }

  audioFigure(data, captionFirstOrNot, target) {
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
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([figure], target)
    } else {
      _.appendChildrenTo(target, [figure])
    }
    this.addFigureStack(stackTraces)
  }

  blockQuote(cite, text, target) {
    const id = `blockquote_${new Date().getTime()}`
    const bq = _.createBlockQuote(cite, text, [], id)
    if (this.isInsertBefore.checked && target !== '#app') {
      _.insertBefore([bq], target)
    } else {
      _.appendChildrenTo(target, [bq])
    }
    this.addNewStack(id, `blockquote ${text}, .....`)
  }
}

export default DeployElement
