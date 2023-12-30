import {
  createButton,
  createForm,
  createInput,
  createLabel,
  createSelect,
  getNode,
} from '../dom/index.js'

function editImageForm(node) {
  const target = getNode(node)
  const srcLb = createLabel('Source', 'edit_src', ['form-label'])
  const srcIp = createInput('', ['form-control'], 'edit_src', {
    value: target.src,
  })
  const altLb = createLabel('Description about image', 'edit_alt', [
    'form-label',
  ])
  const altIp = createInput('', ['form-control'], 'edit_alt', {
    value: target.alt,
  })
  const updateBtn = createButton('Update', ['update-ele-btn'], '', (e) => {
    e.preventDefault()
    target.src = getNode('#edit_src').value
    target.alt = getNode('#edit_alt').value
  })
  return createForm([], [srcLb, srcIp, altLb, altIp, updateBtn], 'edit_form')
}

function editLinkForm(node) {
  const target = getNode(node)
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

  const LinkLb = createLabel('URL', 'edit_link', ['form-label'])
  const linkIp = createInput('', ['form-control', 'my-2'], 'edit_link', {
    value: link,
  })
  const nameLb = createLabel('Link Name', 'edit_link_name', ['form-label'])
  const nameIp = createInput('', ['form-control', 'my-2'], 'edit_link_name', {
    value: target.textContent,
  })
  const titleLb = createLabel('Title for more information', 'edit_title', [
    'form-label',
  ])
  const titleIp = createInput('', ['form-control', 'my-1'], 'edit_title', {
    value: target.title,
  })

  const select = createSelect(
    ['form-select'],
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
      getNode('#edit_link').placeholder = newPlaceholder
    },
    ''
  )
  const updateBtn = createButton('update', ['update-ele-btn'], '', (e) => {
    e.preventDefault()
    let suffix = getNode('#link_type').value
    if (suffix === 'link') {
      suffix = ''
    } else if (suffix === 'email') {
      suffix = 'mailto:'
    } else {
      suffix = 'tel:'
    }
    target.href = `${suffix}${getNode('#edit_link').value}`
    target.textContent = getNode('#edit_link_name').value
    target.title = getNode('#edit_title').value
  })
  return createForm(
    [],
    [select, LinkLb, linkIp, nameLb, nameIp, titleLb, titleIp, updateBtn],
    'edit_form'
  )
}

export { editImageForm, editLinkForm }
