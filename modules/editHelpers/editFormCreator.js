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
  const updateBtn = _.createButton('Update', ['update-ele-btn'], '', (e) => {
    e.preventDefault()
    target.src = _.getNode('#edit_src').value
    target.alt = _.getNode('#edit_alt').value
  })
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
      _.getNode('#edit_link').placeholder = newPlaceholder
    },
    ''
  )
  const updateBtn = _.createButton('update', ['update-ele-btn'], '', (e) => {
    e.preventDefault()
    let suffix = _.getNode('#link_type').value
    if (suffix === 'link') {
      suffix = ''
    } else if (suffix === 'email') {
      suffix = 'mailto:'
    } else {
      suffix = 'tel:'
    }
    target.href = `${suffix}${_.getNode('#edit_link').value}`
    target.textContent = _.getNode('#edit_link_name').value
    target.title = _.getNode('#edit_title').value
  })
  return _.createForm(
    [],
    [select, LinkLb, linkIp, nameLb, nameIp, titleLb, titleIp, updateBtn],
    'edit_form'
  )
}

export { editImageForm, editLinkForm }
