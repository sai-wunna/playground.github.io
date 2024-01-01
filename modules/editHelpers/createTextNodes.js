import Document from '../dom/index.js'
const _ = Document()

function createTextNodes(node) {
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
          _.getNode('#new_text_node').value || 'text node has been added.'
        )
        _.getNode(node).appendChild(textNode)
        _.getNode('#edit_form').appendChild(createEditBox(textNode))
      }),
    ]
  )

  childNodes.forEach((child) => {
    if (child.nodeType !== Node.TEXT_NODE) return
    fragment.appendChild(createEditBox(child))
  })
  return _.createForm([], [addTNForm, fragment], 'edit_form')
}

export { createTextNodes }
