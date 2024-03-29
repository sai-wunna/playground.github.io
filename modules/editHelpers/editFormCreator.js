'use strict'

class EditForms {
  constructor(doc) {
    this._ = doc
  }

  imageForm(node) {
    const target = this._.getNode(node)
    const srcLb = this._.createLabel('Source', 'edit_src', ['form-label'])
    const srcIp = this._.createInput('', ['form-control'], 'edit_src', {
      value: target.src,
    })
    const altLb = this._.createLabel('Description about image', 'edit_alt', [
      'form-label',
    ])
    const altIp = this._.createInput('', ['form-control'], 'edit_alt', {
      value: target.alt,
    })
    const updateBtn = this._.createButton(
      'Update',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e) => {
        e.preventDefault()
        target.src = srcIp.value
        target.alt = altIp.value
      }
    )
    return this._.createForm(
      [],
      [srcLb, srcIp, altLb, altIp, updateBtn],
      'edit_form'
    )
  }

  linkForm(node) {
    const target = this._.getNode(node)
    let type
    let link
    if (target.href.startsWith(`http`)) {
      type = 1
      if (
        target.href.startsWith(
          'https://sai-wunna.github.io/playground.github.io/'
        )
      ) {
        link = target.href.split('io/')[2]
      } else {
        link = target.href
      }
    } else if (target.href.startsWith(`+`)) {
      type = 3
      link = target.href.split(':')[1]
    } else {
      type = 2
      link = target.href.split(':')[1]
    }

    const LinkLb = this._.createLabel('URL', 'edit_link', ['form-label'])
    const linkIp = this._.createInput(
      '',
      ['form-control', 'my-2'],
      'edit_link',
      {
        value: link,
      }
    )
    const nameLb = this._.createLabel('Link Name', 'edit_link_name', [
      'form-label',
    ])
    const nameIp = this._.createInput(
      '',
      ['form-control', 'my-2'],
      'edit_link_name',
      {
        value: target.textContent,
      }
    )
    const titleLb = this._.createLabel(
      'Title for more information',
      'edit_title',
      ['form-label']
    )
    const titleIp = this._.createInput(
      '',
      ['form-control', 'my-1'],
      'edit_title',
      {
        value: target.title,
      }
    )

    const [select, selectEvtCleaner] = this._.createSelect(
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
        this._.getNodeById('edit_link').placeholder = newPlaceholder
      },
      true
    )
    const updateBtn = this._.createButton(
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
    const form = this._.createForm(
      [],
      [select, LinkLb, linkIp, nameLb, nameIp, titleLb, titleIp, updateBtn],
      'edit_form'
    )
    return [form, selectEvtCleaner]
  }

  optionForm(node) {
    const target = this._.getNode(node)
    const valueLb = this._.createLabel('Value', 'edit_opt_value', [
      'form-label',
    ])
    const valueIp = this._.createInput('', ['form-control'], 'edit_opt_value', {
      value: target.value,
    })
    const valueBox = this._.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [valueLb, valueIp]
    )
    const optionLb = this._.createLabel('Option', 'edit_opt_text', [
      'form-label',
    ])
    const optionIp = this._.createInput('', ['form-control'], 'edit_opt_text', {
      value: target.textContent,
    })
    const textBox = this._.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [optionLb, optionIp]
    )
    const updateBtn = this._.createButton(
      'Update',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e) => {
        target.value = valueIp.value
        target.textContent = optionIp.value
      }
    )

    return this._.createForm([], [valueBox, textBox, updateBtn], 'edit_form')
  }

  textNodeForm(node) {
    let evtCleaners = []
    const childNodes = this._.getNode(node).childNodes
    const fragment = this._.createFragment()
    let spamBlocker

    const createEditBox = (node) => {
      const [textAreaIp, InpEvtCleaner] = this._.createTextArea(
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
        true
      )
      const [delBtn, btnEvtCleaner] = this._.createButton(
        'Del',
        ['inline-btn', 'text-danger'],
        '',
        (e) => {
          e.target.parentElement.remove()
          node.remove()
          evtCleaners = evtCleaners.filter(
            (fn) => fn !== InpEvtCleaner && fn !== btnEvtCleaner
          )
        },
        true
      )
      evtCleaners.push(InpEvtCleaner)
      evtCleaners.push(btnEvtCleaner)
      return this._.createElement(
        'div',
        '',
        ['my-1', 'd-flex'],
        [textAreaIp, delBtn]
      )
    }

    const [addNewTNBtn, addBtnEvtCleaner] = this._.createButton(
      'Add',
      ['btn', 'btn-sm'],
      '',
      () => {
        const textNode = this._.createTNode(
          this._.getNodeById('new_text_node').value ||
            'text node has been added.'
        )
        this._.getNode(node).appendChild(textNode)
        this._.getNodeById('edit_form').appendChild(createEditBox(textNode))
      },
      true
    )
    evtCleaners.push(addBtnEvtCleaner)
    const addTNForm = this._.createElement(
      'div',
      '',
      ['my-1', 'd-flex'],
      [
        this._.createInput('', ['form-control'], 'new_text_node', {
          placeholder: 'new text node ... ... ...',
        }),
        addNewTNBtn,
      ]
    )

    childNodes.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return
      fragment.appendChild(createEditBox(child))
    })

    const form = this._.createForm([], [addTNForm, fragment], 'edit_form')
    const cleanUpFunc = () => {
      evtCleaners.forEach((cleaner) => cleaner())
    }

    return [form, cleanUpFunc]
  }

  blockQuoteForm(node) {
    const target = this._.getNode(node)
    const citeLb = this._.createLabel('Cite', 'edit_cite', ['form-label'])
    const citeIp = this._.createInput('', ['form-control'], 'edit_cite', {
      value: target.cite,
    })
    const contentLb = this._.createLabel('Content', 'edit_content', [
      'form-label',
    ])
    const contentIp = this._.createInput('', ['form-control'], 'edit_content', {
      value: target.textContent,
    })
    const updateBtn = this._.createButton(
      'Update',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      () => {
        target.cite = citeIp.value
        target.textContent = contentIp.value
      }
    )
    return this._.createForm(
      [],
      [citeLb, citeIp, contentLb, contentIp, updateBtn],
      'edit_form'
    )
  }
}

export default EditForms
// Need to reconsider
