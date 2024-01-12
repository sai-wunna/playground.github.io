import Document from '../dom/index.js'

const _ = Document()

function editImageForm(node) {
  const target = _.getNode(node)
  const srcLb = _.createLabel('Source', 'edit_src', ['form-label'])
  const srcIp = _.createInput('', ['form-control'], 'edit_src', {
    value: target.src,
  })
  const altLb = _.createLabel('Description about image', 'edit_alt', [
    'form-label',
  ])
  const altIp = _.createInput('', ['form-control'], 'edit_alt', {
    value: target.alt,
  })
  const updateBtn = _.createButton(
    'Update',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    (e) => {
      e.preventDefault()
      target.src = srcIp.value
      target.alt = altIp.value
    }
  )
  return _.createForm([], [srcLb, srcIp, altLb, altIp, updateBtn], 'edit_form')
}

function editLinkForm(node) {
  const target = _.getNode(node)
  let type
  let link
  if (target.href.startsWith(`http`)) {
    type = 1
    link = target.href
  } else if (target.href.startsWith(`+`)) {
    type = 3
    link = target.href.split(':')[1]
  } else {
    type = 2
    link = target.href.split(':')[1]
  }

  const LinkLb = _.createLabel('URL', 'edit_link', ['form-label'])
  const linkIp = _.createInput('', ['form-control', 'my-2'], 'edit_link', {
    value: link,
  })
  const nameLb = _.createLabel('Link Name', 'edit_link_name', ['form-label'])
  const nameIp = _.createInput('', ['form-control', 'my-2'], 'edit_link_name', {
    value: target.textContent,
  })
  const titleLb = _.createLabel('Title for more information', 'edit_title', [
    'form-label',
  ])
  const titleIp = _.createInput('', ['form-control', 'my-1'], 'edit_title', {
    value: target.title,
  })

  const select = _.createSelect(
    ['form-select'],
    '',
    [
      { value: 'link', text: 'Link', selected: type === 1 },
      { value: 'email', text: 'Email', selected: type === 2 },
      { value: 'phone', text: 'Phone', selected: type === 3 },
    ],
    'link_type',
    (e) => {
      e.preventDefault()
      let newPlaceholder
      if (e.target.value === 'link') {
        newPlaceholder = 'https://example.com'
      } else if (e.target.value === 'email') {
        newPlaceholder = 'example@gamil.com'
      } else {
        newPlaceholder = '+123 456 789 012'
      }
      _.getNodeById('edit_link').placeholder = newPlaceholder
    },
    ''
  )
  const updateBtn = _.createButton(
    'update',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    (e) => {
      e.preventDefault()
      let suffix = select.value
      if (suffix === 'link') {
        suffix = ''
      } else if (suffix === 'email') {
        suffix = 'mailto:'
      } else {
        suffix = 'tel:'
      }
      target.href = `${suffix}${linkIp.value}`
      target.textContent = nameIp.value
      target.title = titleIp.value
    }
  )
  return _.createForm(
    [],
    [select, LinkLb, linkIp, nameLb, nameIp, titleLb, titleIp, updateBtn],
    'edit_form'
  )
}

function editOptionForm(node) {
  const target = _.getNode(node)
  const valueLb = _.createLabel('Value', 'edit_opt_value', ['form-label'])
  const valueIp = _.createInput('', ['form-control'], 'edit_opt_value', {
    value: target.value,
  })
  const valueBox = _.createElement('', '', ['cs-ip-gp'], [valueLb, valueIp])
  const optionLb = _.createLabel('Option', 'edit_opt_text', ['form-label'])
  const optionIp = _.createInput('', ['form-control'], 'edit_opt_text', {
    value: target.textContent,
  })
  const textBox = _.createElement('', '', ['cs-ip-gp'], [optionLb, optionIp])
  const updateBtn = _.createButton(
    'Update',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    (e) => {
      target.value = valueIp.value
      target.textContent = optionIp.value
    }
  )
  return _.createForm([], [valueBox, textBox, updateBtn], 'edit_form')
}

function textNodeForm(node) {
  const childNodes = _.getNode(node).childNodes
  const fragment = _.createFragment()
  let spamBlocker

  function createEditBox(node) {
    return _.createElement(
      'div',
      '',
      ['my-1', 'd-flex'],
      [
        _.createTextArea(
          '',
          ['form-control'],
          {
            value: node.textContent,
          },
          '',
          (e) => {
            clearTimeout(spamBlocker)
            spamBlocker = setTimeout(() => {
              node.textContent = e.target.value
            }, 500)
          },
          ''
        ),
        _.createButton('Del', ['inline-btn', 'text-danger'], '', (e) => {
          e.target.parentElement.remove()
          node.remove()
        }),
      ]
    )
  }

  const addTNForm = _.createElement(
    'div',
    '',
    ['my-1', 'd-flex'],
    [
      _.createInput('', ['form-control'], 'new_text_node', {
        placeholder: 'new text node ... ... ...',
      }),
      _.createButton('Add', ['btn', 'btn-sm'], '', (e) => {
        const textNode = _.createTNode(
          _.getNodeById('new_text_node').value || 'text node has been added.'
        )
        _.getNode(node).appendChild(textNode)
        _.getNodeById('edit_form').appendChild(createEditBox(textNode))
      }),
    ]
  )

  childNodes.forEach((child) => {
    if (child.nodeType !== Node.TEXT_NODE) return
    fragment.appendChild(createEditBox(child))
  })
  return _.createForm([], [addTNForm, fragment], 'edit_form')
}

function editBlockQuoteForm(node) {
  const target = _.getNode(node)
  const citeLb = _.createLabel('Cite', 'edit_cite', ['form-label'])
  const citeIp = _.createInput('', ['form-control'], 'edit_cite', {
    value: target.cite,
  })
  const contentLb = _.createLabel('Content', 'edit_content', ['form-label'])
  const contentIp = _.createInput('', ['form-control'], 'edit_content', {
    value: target.textContent,
  })
  const updateBtn = _.createButton(
    'Update',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    function (e) {
      target.cite = citeIp.value
      target.textContent = contentIp.value
    }
  )
  return _.createForm(
    [],
    [citeLb, citeIp, contentLb, contentIp, updateBtn],
    'edit_form'
  )
}

export {
  editImageForm,
  editLinkForm,
  editOptionForm,
  textNodeForm,
  editBlockQuoteForm,
}
