import {
  createButton,
  createElement,
  createForm,
  createFragment,
  createInput,
  createTextArea,
  getNode,
  createTNode,
} from '../dom/dom.js'

function createTextNodes(node) {
  const childNodes = getNode(node).childNodes
  const fragment = createFragment()
  let spamBlocker

  function createEditBox(node) {
    return createElement(
      'div',
      '',
      ['my-1', 'd-flex'],
      [
        createTextArea(
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
        createButton('Del', ['inline-btn', 'text-danger'], '', (e) => {
          e.target.parentElement.remove()
          node.remove()
        }),
      ]
    )
  }

  const addTNForm = createElement(
    'div',
    '',
    ['my-1', 'd-flex'],
    [
      createInput('', ['form-control'], 'new_text_node', {
        placeholder: 'new text node ... ... ...',
      }),
      createButton('Add', ['btn', 'btn-sm'], '', (e) => {
        const textNode = createTNode(
          getNode('#new_text_node').value || 'text node has been added.'
        )
        getNode(node).appendChild(textNode)
        getNode('#edit_form').appendChild(createEditBox(textNode))
      }),
    ]
  )

  childNodes.forEach((child) => {
    if (child.nodeType !== Node.TEXT_NODE) return
    fragment.appendChild(createEditBox(child))
  })
  return createForm([], [addTNForm, fragment], 'edit_form')
}

export { createTextNodes }
