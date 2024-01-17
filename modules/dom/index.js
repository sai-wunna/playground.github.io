class Doc {
  constructor() {
    this._ = document
  }

  getNode(node) {
    return this._.querySelector(node)
  }
  getNodeById(id) {
    return this._.getElementById(id)
  }
  getNodeOn(parent, node) {
    return parent.querySelector(node)
  }
  getAllNodes(node) {
    return this._.querySelectorAll(node)
  }
  getAllNodesOn(node) {
    return parent.querySelectorAll(node)
  }
  createNode(node) {
    return this._.createElement(node)
  }
  createTNode(text) {
    return this._.createTextNode(text)
  }
  removeChild(node) {
    this._.body.removeChild(node)
  }
  appendChild(node) {
    this._.body.appendChild(node)
  }
  on(event, ele, fn) {
    ele.addEventListener(event, (e) => fn(e))
  }
  addClassList(ele, cl) {
    ele.className = cl
  }
  addCN(ele, cn) {
    ele.classList.add(cn)
  }
  removeCN(ele, cn) {
    ele.classList.remove(cn)
  }
  cnContains(ele, cl) {
    return ele.classList.contains(cl)
  }
  toggleCN(ele, cn, opt) {
    if (opt) {
      ele.classList.toggle(cn)
    } else {
      ele.classList.toggle(cn, opt)
    }
  }
  replaceCN(ele, o, n) {
    ele.classList.replace(o, n)
  }

  // ----------------------------------------------
  createTag(props) {
    if (typeof props === 'string') {
      return this.createTNode(props)
    }

    const { tagName, attrs = {}, children = [], event = {} } = props
    const ele = this._.createElement(tagName)
    for (const [k, v] of Object.entries(attrs)) {
      ele.setAttribute(k, v)
    }

    for (const child of children) {
      let cEle
      if (typeof child === 'object') {
        cEle = this.createTag(child)
      } else {
        cEle = this.createTNode(child)
      }
      ele.appendChild(cEle)
    }

    // not require for current usage
    // for (const [evt, fn] of Object.entries(event)) {
    //   ele.addEventListener(evt, (e) => fn(e))
    // }

    return ele
  }
  // ----------------------------------------------

  createFragment(children = []) {
    const fragment = this._.createDocumentFragment()
    children.forEach((child) => {
      fragment.appendChild(child)
    })
    return fragment
  }
  createInput(type, classList = [], id, options = {}, event, fn, ...args) {
    const input = this.createNode('input')
    input.type = type || 'text'
    if (classList.length > 0) {
      input.className = classList.join(' ')
    }
    for (const [key, value] of Object.entries(options)) {
      input.setAttribute(key, value)
    }
    if (id) {
      input.id = id
    }
    let evt = event || 'change'
    if (fn) {
      input.addEventListener(evt, (e) => fn(e, ...args))
    }

    return input
  }

  createLabel(text, ref, classList = [], id) {
    const label = this.createNode('label')
    if (ref) {
      label.htmlFor = ref
    }
    label.textContent = text
    if (classList.length > 0) {
      label.className = classList.join(' ')
    }
    if (id) {
      label.id = id
    }
    return label
  }

  createTextArea(ref, classList = [], options, id, fn, ...args) {
    const tArea = this.createNode('textarea')
    if (ref) {
      tArea.htmlFor = ref
    }
    if (classList.length > 0) {
      tArea.className = classList.join(' ')
    }
    if (options) {
      if (options.placeholder) {
        tArea.placeholder = options.placeholder
      }
      if (options.name) {
        tArea.name = options.name
      }
      if (options.value) {
        tArea.value = options.value
      }
    }
    if (id) {
      tArea.id = id
    }
    if (fn) {
      tArea.addEventListener('input', (e) => fn(e, ...args))
    }
    return tArea
  }

  createSubmitButton(text, classList = [], id) {
    const button = this.createNode('button')
    button.type = 'submit'
    button.textContent = text
    if (classList.length > 0) {
      button.className = classList.join(' ')
    }
    button.id = id
    return button
  }

  createOption(parent, value, text, id, selected, disabled) {
    const option = this.createNode('option')
    option.value = value
    option.textContent = text
    if (id) {
      option.id = id
    }
    if (selected) {
      option.selected = true
    }
    if (disabled) {
      option.disabled = true
    }
    if (parent) {
      parent.add(option)
    } else {
      return option
    }
  }

  createSelect(classList = [], text, options, id, fn, ...args) {
    const select = this.createNode('select')
    if (classList.length > 0) {
      select.className = classList.join(' ')
    }
    if (text) {
      const emptyOpt = this.createNode('option')
      emptyOpt.value = ''
      emptyOpt.text = text
      select.add(emptyOpt)
    }

    options.forEach((data) => {
      this.createOption(
        select,
        data.value || '',
        data.text || '',
        data.id || '',
        data.selected || '',
        data.disabled || ''
      )
    })
    if (id) {
      select.id = id
    }
    if (fn) {
      select.addEventListener('change', (e) => fn(e, ...args))
    }
    return select
  }

  createForm(classList = [], elements = [], id, handleSubmit, ...args) {
    const form = this.createNode('form')
    elements.forEach((ele) => {
      form.appendChild(ele)
    })
    if (classList.length > 0) {
      form.className = classList.join(' ')
    }
    if (id) form.id = id
    if (handleSubmit) {
      form.addEventListener('submit', (e) => handleSubmit(e, ...args))
    }
    return form
  }
  // form creation ------------------------------- end ///////////////

  createList(type, classList = [], id, lists = []) {
    const list = this.createNode(type)
    if (classList.length > 0) {
      list.className = classList.join(' ')
    }
    if (id) {
      list.id = id
    }
    lists.forEach((item) => {
      const listItem = this.createNode('li')
      if (item.classList) {
        item.className = item.classList.join(' ')
      }
      if (typeof item.text === 'object') {
        listItem.appendChild(item.text)
      } else {
        listItem.textContent = item.text
      }
      if (item.id) {
        listItem.id = item.id
      }
      if (item.fn) {
        listItem.addEventListener('click', (e) => item.fn(e, ...item.args))
      }
      list.appendChild(listItem)
    })
    return list
  }

  createProgress(text, classList = [], max, value, id) {
    const progress = this.createNode('progress')
    progress.max = max || 100
    progress.value = value || 50
    if (id) {
      progress.id = id
    }
    if (text) {
      progress.textContent = text
    }
    if (classList.length > 0) {
      progress.className = classList.join(' ')
    }
    return progress
  }

  createAnchor(type, text, href, classList = [], id, title) {
    const a = this.createNode('a')

    if (href) {
      if (type === 'email') {
        a.href = `mailto:${href}`
      } else if (type === 'phone') {
        a.href = `tel:${href}`
      } else {
        a.href = href
      }
    } else {
      a.href = '#'
    }
    if (classList.length > 0) {
      a.className = classList.join(' ')
    }
    if (title) {
      a.title = title
    }
    if (text === 'object') {
      a.appendChild(text)
    } else {
      a.textContent = text || 'Link'
    }
    if (id) {
      a.id = id
    }
    return a
  }

  createImage(src, alt, classList = [], id) {
    const img = this.createNode('img')
    img.src = src || '#'
    img.alt = alt
    if (id) {
      img.id = id
    }
    if (classList.length > 0) {
      img.className = classList.join(' ')
    }
    return img
  }

  createElement(type, text, classList = [], children = [], id) {
    const div = this.createNode(type || 'div')
    if (text) {
      if (typeof text === 'object') {
        div.appendChild(text)
      } else {
        div.textContent = text
      }
    }
    children.forEach((child) => {
      div.appendChild(child)
    })
    if (classList.length > 0) {
      div.className = classList.join(' ')
    }
    if (id) {
      div.id = id
    }
    return div
  }

  createButton(btnName, classList = [], id, handleClick, ...args) {
    const button = this.createNode('button')
    button.type = 'button'
    if (typeof btnName === 'object') {
      button.appendChild(btnName)
    } else {
      button.textContent = btnName
    }
    if (classList.length > 0) {
      button.className = classList.join(' ')
    }
    if (handleClick) {
      button.addEventListener('click', (e) => handleClick(e, ...args))
    }
    if (id) button.id = id
    return button
  }

  createSpan(text, classList = [], id) {
    const span = this.createNode('span')
    if (text) {
      if (typeof text === 'object') {
        span.appendChild(text)
      } else {
        span.textContent = text
      }
    }
    if (classList.length > 0) {
      span.className = classList.join(' ')
    }
    if (id) span.id = id
    return span
  }

  createHeading(type, heading, classList = [], id, handleClick, ...args) {
    const header = this.createNode(type)
    if (typeof heading === 'object') {
      header.appendChild(heading)
    } else {
      header.textContent = heading
    }
    if (classList.length > 0) {
      header.className = classList.join(' ')
    }
    if (id) {
      header.id = id
    }
    if (handleClick) {
      header.addEventListener('click', (e) => handleClick(e, ...args))
    }
    return header
  }

  // table creation ----------------------------- start //////////////
  //  createTable(
  //   classList = [],
  //   tableHeader,
  //   tableDataRows,
  //   tableFooter,
  //   id
  // ) {
  //   const table = this.createNode('table')
  //   addClassList(table, classList)
  //   if (tableHeader) {
  //     if (tableHeader[0]) {
  //       table.appendChild(createTHead([], [...tableHeader]))
  //     } else {
  //       table.appendChild(tableHeader)
  //     }
  //   }
  //   if (tableDataRows) {
  //     if (tableDataRows[0]) {
  //       table.appendChild(createTBody([], tableDataRows))
  //     } else {
  //       table.appendChild(tableDataRows)
  //     }
  //   }
  //   if (tableFooter) {
  //     if (tableFooter[0]) {
  //       table.appendChild(createTFoot([], tableFooter))
  //     } else {
  //       table.appendChild(tableFooter)
  //     }
  //   }
  //   if (id) {
  //     table.id = id
  //   }

  //   return table
  // }
  // -----------_______ need to reconsider _______------------------ //
  createTHead(classList = [], tableHeaderData = [], id, trId) {
    // tableHeaderData = [{ heading : '' || obj , classList : []}]
    const thead = this.createNode('thead')
    if (classList.length > 0) {
      thead.className = classList.join(' ')
    }
    if (id) {
      thead.id = id
    }
    const tr = this.createNode('tr')
    if (trId) {
      tr.id = trId
    }
    tableHeaderData.forEach((data) => {
      const th = this.createNode('th')
      if (typeof data.heading === 'object') {
        th.appendChild(data.heading)
      } else {
        th.textContent = data.heading
      }
      if (data.id) {
        th.id = data.id
      }
      if (data.classList) {
        th.className = data.classList
      }
      tr.appendChild(th)
    })
    thead.appendChild(tr)
    return thead
  }

  createTBody(classList = [], bodyData = [], id) {
    // bodyData = [{data : [{text : '' || obj, classList : [], id , fn , ... args}], id : ''}, . . .]
    const tbody = this.createNode('tbody')
    if (classList.length > 0) {
      tbody.className = classList.join(' ')
    }
    bodyData.forEach((bodyData) => {
      tbody.appendChild(this.createTRow(bodyData.data, bodyData.trId))
    })
    if (id) {
      tbody.id = id
    }
    return tbody
  }

  createTFoot(classList = [], footerData = [], id, trId) {
    const tfoot = this.createNode('tfoot')
    if (classList.length > 0) {
      tfoot.className = classList.join(' ')
    }
    if (id) {
      tfoot.id = id
    }
    const tr = this.createTRow(footerData, trId)
    tfoot.appendChild(tr)
    return tfoot
  }

  createTRow(tRData, id) {
    const tr = this.createNode('tr')
    if (id) {
      tr.id = id
    }
    tRData.forEach((data) => {
      const td = this.createNode('td')
      if (typeof data.text === 'object') {
        td.appendChild(data.text)
      } else {
        td.textContent = data.text
      }
      if (data.id) {
        td.id = data.id
      }
      if (data.classList) {
        td.className = data.classList.join(' ')
      }
      if (data.fn) {
        td.addEventListener('click', (e) => data.fn(e, ...data.args))
      }
      tr.appendChild(td)
    })
    return tr
  }
  // table creation ----------------------------- end ////////

  createAudio(src, classList = [], id) {
    const audio = this.createNode('audio')
    audio.src = src
    if (classList.length > 0) {
      audio.className = classList.join(' ')
    }
    audio.controls = true
    if (id) audio.id = id
    return audio
  }

  createFigCaption(text, classList = [], id) {
    const cap = this.createNode('figcaption')
    if (text) {
      if (typeof text === 'object') {
        cap.appendChild(text)
      } else {
        cap.textContent = text
      }
    }
    if (classList.length > 0) {
      cap.className = classList.join(' ')
    }
    if (id) {
      cap.id = id
    }
    return cap
  }

  createBlockQuote(cite, text, classList = [], id) {
    const bq = this.createNode('blockquote')
    bq.cite = cite || "i don't remember it"
    if (text) {
      if (typeof text === 'object') {
        bq.appendChild(text)
      } else {
        bq.textContent = text
      }
    }
    if (classList.length > 0) {
      bq.className = classList.join(' ')
    }
    if (id) {
      bq.id = id
    }
    return bq
  }

  createCite(text, classList = [], id) {
    const cite = this.createNode('cite')
    if (text) {
      if (typeof text === 'object') {
        cite.appendChild(text)
      } else {
        cite.textContent = text
      }
    }
    if (classList.length > 0) {
      cite.className = classList.join(' ')
    }
    if (id) {
      cite.id = id
    }
    return id
  }

  createCanvas(imageData, classList = [], id) {
    const canvas = this.createNode('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = imageData.width
    canvas.height = imageData.height
    canvas.id = id
    if (classList.length > 0) {
      canvas.className = classList.join(' ')
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas
  }

  appendChildrenTo(parent, children) {
    let par
    if (typeof parent === 'object') {
      par = parent
    } else {
      par = this.getNode(parent)
    }

    children.forEach((child) => {
      par.appendChild(child)
    })
  }

  insertBefore(children, lastNode) {
    let par
    let lNode
    if (typeof lastNode === 'object') {
      lNode = lastNode
    } else {
      lNode = this.getNode(lastNode)
    }
    par = lNode.parentElement
    children.forEach((child) => {
      par.insertBefore(child, lNode)
    })
  }

  emptyChild(ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.lastChild)
    }
  }
}

export default () => new Doc()
