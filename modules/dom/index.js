import { manageInputEle } from './helpers.js'

function getNode(node) {
  return document.querySelector(node)
}
function getAllNodes(node) {
  return document.querySelectorAll(node)
}
function createNode(node) {
  return document.createElement(node)
}
function createTNode(text) {
  return document.createTextNode(text)
}
function removeChild(node) {
  document.body.removeChild(node)
}
function appendChild(node) {
  document.body.appendChild(node)
}
function on(event, ele, fn) {
  ele.addEventListener(event, (e) => fn(e))
}
function addCN(ele, cl) {
  ele.classList.add(cl)
}
function removeCN(ele, cl) {
  ele.classList.remove(cl)
}
function cnContains(ele, cl) {
  return ele.classList.contains(cl)
}

function createFragment(children = []) {
  const fragment = document.createDocumentFragment()
  children.forEach((child) => {
    fragment.appendChild(child)
  })
  return fragment
}

function createInput(
  type,
  classList = [],
  id,
  options = {},
  event,
  fn,
  ...args
) {
  const input = createNode('input')
  input.type = type || 'text'
  if (classList.length > 0) {
    input.className = classList.join(' ')
  }
  manageInputEle(input, input.type, options)
  if (id) {
    input.id = id
  }
  let evt = event || 'change'
  if (fn) {
    input.addEventListener(evt, (e) => fn(e, ...args))
  }

  return input
}

function createLabel(text, ref, classList = [], id) {
  const label = createNode('label')
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

function createTextArea(ref, classList = [], options, id, fn, ...args) {
  const tArea = createNode('textarea')
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

function createSubmitButton(text, classList = [], id) {
  const button = createNode('button')
  button.type = 'submit'
  button.textContent = text
  if (classList.length > 0) {
    button.className = classList.join(' ')
  }
  button.id = id
  return button
}

function createOption(parent, value, text, id, selected, disabled) {
  const option = createNode('option')
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

function createSelect(classList = [], text, options, id, fn, ...args) {
  const select = createNode('select')
  if (classList.length > 0) {
    select.className = classList.join(' ')
  }
  if (text) {
    const emptyOpt = createNode('option')
    emptyOpt.value = ''
    emptyOpt.text = text
    select.add(emptyOpt)
  }

  options.forEach((data) => {
    createOption(
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

function createForm(classList = [], elements = [], id, handleSubmit, ...args) {
  const form = createNode('form')
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

function createList(type, classList = [], id, lists = []) {
  const list = createNode(type)
  if (classList.length > 0) {
    list.className = classList.join(' ')
  }
  if (id) {
    list.id = id
  }
  lists.forEach((item) => {
    const listItem = createNode('li')
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

function createProgress(text, classList = [], max, value, id) {
  const progress = createNode('progress')
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

function createAnchor(type, text, href, classList = [], id, title, download) {
  const a = createNode('a')

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
  if (download) {
    a.download = download
  }
  return a
}

function createImage(src, alt, classList = [], id) {
  const img = createNode('img')
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

function createElement(type, text, classList = [], children = [], id) {
  const div = createNode(type || 'div')
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

function createButton(btnName, classList = [], id, handleClick, ...args) {
  const button = createNode('button')
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

function createSpan(text, classList = [], id) {
  const span = createNode('span')
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

function createHeading(
  type,
  heading,
  classList = [],
  id,
  handleClick,
  ...args
) {
  const header = createNode(type)
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
// function createTable(
//   classList = [],
//   tableHeader,
//   tableDataRows,
//   tableFooter,
//   id
// ) {
//   const table = createNode('table')
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
function createTHead(classList = [], tableHeaderData = [], id, trId) {
  // tableHeaderData = [{ heading : '' || obj , classList : []}]
  const thead = createNode('thead')
  if (classList.length > 0) {
    thead.className = classList.join(' ')
  }
  if (id) {
    thead.id = id
  }
  const tr = createNode('tr')
  if (trId) {
    tr.id = trId
  }
  tableHeaderData.forEach((data) => {
    const th = createNode('th')
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

function createTBody(classList = [], bodyData = [], id) {
  // bodyData = [{data : [{text : '' || obj, classList : [], id , fn , ... args}], id : ''}, . . .]
  const tbody = createNode('tbody')
  if (classList.length > 0) {
    tbody.className = classList.join(' ')
  }
  bodyData.forEach((bodyData) => {
    tbody.appendChild(createTRow(bodyData.data, bodyData.trId))
  })
  if (id) {
    tbody.id = id
  }
  return tbody
}

function createTFoot(classList = [], footerData = [], id, trId) {
  const tfoot = createNode('tfoot')
  if (classList.length > 0) {
    tfoot.className = classList.join(' ')
  }
  if (id) {
    tfoot.id = id
  }
  const tr = createTRow(footerData, trId)
  tfoot.appendChild(tr)
  return tfoot
}

function createTRow(tRData, id) {
  const tr = createNode('tr')
  if (id) {
    tr.id = id
  }
  tRData.forEach((data) => {
    const td = createNode('td')
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

function createAudio(src, id) {
  const audio = createNode('audio')
  audio.src = src
  audio.controls = true
  if (id) audio.id = id
  return audio
}

function createFigCaption(text, id) {
  const cap = createNode('figcaption')
  cap.textContent = text
  if (id) {
    cap.id = id
  }
  return cap
}

function createCanvas(imageData, classList = [], id) {
  const canvas = createNode('canvas')
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

function appendChildrenTo(parent, children) {
  let par
  if (typeof parent === 'object') {
    par = parent
  } else {
    par = getNode(parent)
  }

  children.forEach((child) => {
    par.appendChild(child)
  })
}

function insertBefore(children, lastNode) {
  let par
  let lNode
  if (typeof lastNode === 'object') {
    lNode = lastNode
  } else {
    lNode = getNode(lastNode)
  }
  par = lNode.parentElement
  children.forEach((child) => {
    par.insertBefore(child, lNode)
  })
}

function removeAllMyChild(ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.lastChild)
  }
}

export {
  on,
  getAllNodes,
  getNode,
  addCN,
  removeCN,
  cnContains,
  createNode,
  createTNode,
  createFragment,
  appendChild,
  removeChild,
  removeAllMyChild,
  createElement,
  // the followings are ready-made
  createList,
  createTextArea,
  createForm,
  createLabel,
  createOption,
  createSelect,
  createSubmitButton,
  createAnchor,
  createHeading,
  createSpan,
  createButton,
  createCanvas,
  createInput,
  createProgress,
  createAudio,
  createFigCaption,
  // createTable,
  createTHead,
  createTBody,
  createTRow,
  createTFoot,
  createImage,
  appendChildrenTo,
  insertBefore,
}
