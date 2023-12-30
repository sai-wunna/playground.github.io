import {
  createButton,
  createElement,
  createForm,
  createFragment,
  createInput,
  createLabel,
  createSelect,
  getAllNodes,
  getNode,
  insertBefore,
} from '../dom/index.js'

function createBlockForm() {
  const label = createLabel('Content', 'new_block', ['form-label'])
  const input = createInput('', ['form-control'], 'new_block', {
    value: 'new block',
  })
  return createForm([], [label, input], 'add_form')
}

function createImageForm() {
  const srcLabel = createLabel('Source, link', 'new_image', ['form-label'])
  const srcInput = createInput('', ['form-control'], 'new_image', {
    placeholder: 'Only link is available now',
  })
  const altLabel = createLabel('Something about this image', 'new_alt', [
    'form-label',
  ])
  const altInput = createInput('', ['form-control'], 'new_alt', {
    placeholder: 'something about this image',
  })
  return createForm([], [srcLabel, srcInput, altLabel, altInput], 'add_form')
}

function createHeadingForm() {
  const label = createLabel('Heading Type', 'new_header', ['form-label'])
  const select = createSelect(
    ['form-select'],
    '',
    [
      { value: 'h1', text: 'Heading One', selected: true },
      { value: 'h2', text: 'Heading Two' },
      ,
      { value: 'h3', text: 'Heading Three' },
      ,
      { value: 'h4', text: 'Heading Four' },
      ,
      { value: 'h5', text: 'Heading Five' },
      ,
      { value: 'h6', text: 'Heading Six' },
    ],
    'new_header'
  )
  const label2 = createLabel('Heading content', 'new_h_content', ['form-label'])
  const input = createInput('', ['form-control'], 'new_h_content', {
    placeholder: 'The Heading',
  })
  return createForm([], [label, select, label2, input], 'add_form')
}

function createLinkForm() {
  const label = createLabel('URL', 'new_link', ['form-label'])
  const input = createInput('', ['form-control', 'my-2'], 'new_link', {
    placeholder: 'https://example.com',
  })
  const label2 = createLabel('Link Name', 'new_link_name', ['form-label'])
  const input2 = createInput('', ['form-control', 'my-2'], 'new_link_name')
  const select = createSelect(
    ['form-select'],
    '',
    [
      { value: 'link', text: 'Link', selected: true },
      { value: 'email', text: 'Email' },
      { value: 'phone', text: 'Phone' },
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
      getNode('#new_link').placeholder = newPlaceholder
    },
    ''
  )
  const label3 = createLabel('Title for more information', 'new_title', [
    'form-label',
  ])
  const input3 = createInput('', ['form-control', 'my-1'], 'new_title')
  return createForm(
    [],
    [select, label, input, label2, input2, label3, input3],
    'add_form'
  )
}

function createParagraphForm() {
  const label = createLabel('Content of the paragraph', 'new_para', [
    'form-label',
  ])
  const textArea = createElement(
    'textarea',
    '',
    ['form-control'],
    [],
    'new_para'
  )
  return createForm([], [label, textArea], 'add_form')
}

function createButtonForm() {
  const label = createLabel('Button name', 'new_button', ['form-label'])
  const input = createInput('', ['form-control'], 'new_button', {
    value: 'Click Me',
  })
  return createForm([], [label, input], 'add_form')
}

function createInputForm() {
  // under construction
}

function createListForm() {
  const label = createLabel('List type', 'list_type', ['form-label'])
  const select = createSelect(
    ['form-select'],
    '',
    [
      { value: 'ol', text: 'Ordered List', selected: true },
      { value: 'ul', text: 'Unordered List' },
    ],
    'list_type'
  )
  const fragment = createFragment()
  function createListItem() {
    return createInput('', ['form-control', 'list-value'], '', {
      placeholder: 'list item',
    })
  }
  for (let i = 0; i < 3; i++) {
    fragment.appendChild(createListItem())
  }
  const del = createButton('Del', ['btn', 'btn-sm', 'text-danger'], '', () => {
    const listItems = getAllNodes('.list-value')
    if (listItems.length === 2) return
    listItems[listItems.length - 1].remove()
  })
  const add = createButton('Add', ['btn', 'btn-sm', 'text-primary'], '', () => {
    getNode('#add_form').appendChild(createListItem())
  })
  const controllers = createElement(
    'div',
    '',
    ['d-flex', 'justify-content-between'],
    [del, add]
  )
  return createForm([], [controllers, select, fragment], 'add_form')
}

function createTextForm() {
  const label = createLabel('Short text', 'new_text', ['form-label'])
  const input = createInput('', ['form-control'], 'new_text')
  return createForm([], [label, input], 'add_form')
}

function createTableForm() {
  const tHLabel = createLabel('Table headers', '', ['form-label'])
  const tHRow = createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-h-cell')]
  )
  const tBLabel = createLabel('Table Body', '', ['form-label'])
  const tBRow = createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-b-cell')]
  )
  const tFLabel = createLabel('Table Footers', '', ['form-label'])
  const tFRow = createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-f-cell')]
  )
  function createTRow(type) {
    const fragment = createFragment()
    const del = createButton(
      'Del',
      ['btn', 'btn-sm', 'text-danger'],
      '',
      (e) => {
        const cells = e.target.parentElement.querySelectorAll('input')
        if (cells.length > 1) {
          cells[cells.length - 1].remove()
        } else if (
          !(
            cells[0].classList.contains('c-t-h-cell') ||
            cells[0].classList.contains('c-t-f-cell')
          )
        ) {
          e.target.parentElement.remove()
        }
      }
    )
    for (let i = 0; i < 4; i++) {
      fragment.appendChild(addNewCell(type))
    }
    const add = createButton(
      'Add',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e, type) => {
        insertBefore([addNewCell(type)], e.target)
      },
      type
    )
    return [del, fragment, add]
  }
  function addNewCell(type) {
    return createInput('', ['c-t-cell', `${type}`], '')
  }
  const addBodyRow = createButton(
    'Add Row',
    ['btn', 'btn-sm', 'text-primary', 'd-block'],
    '',
    (e) => {
      insertBefore(
        [
          createElement(
            'div',
            '',
            ['my-1', 'flex', 'flex-wrap', 'align-items-center'],
            [...createTRow('c-t-b-cell')]
          ),
        ],
        e.target
      )
    },
    ''
  )
  return createForm(
    [],
    [tHLabel, tHRow, tBLabel, tBRow, addBodyRow, tFLabel, tFRow],
    'add_form'
  )
}

function createSelectionForm() {
  const label = createLabel('Options')
  const fragment = createFragment()
  const del = createButton(
    'Del',
    ['btn', 'btn-sm', 'text-danger'],
    '',
    (e) => {
      e.preventDefault()
      const options = getAllNodes('.option-data')
      if (options.length === 1) return
      options[options.length - 1].parentElement.remove()
    },
    ''
  )
  const add = createButton(
    'Add',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    (e) => {
      e.preventDefault()
      const set = createElement(
        'div',
        '',
        ['my-1', 'd-flex'],
        [
          createInput('', ['option-value', 'form-control'], '', {
            placeholder: 'value',
            name: "select's value",
          }),
          createInput('', ['option-data', 'form-control'], '', {
            placeholder: 'option',
            name: "select's option",
          }),
        ]
      )
      getNode('#add_form').appendChild(set)
    },
    ''
  )
  for (let i = 0; i < 5; i++) {
    const value = createInput('', ['option-value', 'form-control'], '', {
      placeholder: 'value',
      name: "select's value",
    })
    const input = createInput('', ['option-data', 'form-control'], '', {
      placeholder: 'option',
      name: "select's option",
    })
    fragment.appendChild(
      createElement('div', '', ['my-1', 'd-flex'], [value, input])
    )
  }
  const controllers = createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'justify-content-between'],
    [del, label, add]
  )
  return createForm([], [controllers, fragment], 'add_form')
}

function createFigureForm() {
  const label = createLabel('Image Box or Audio Box', 'new_img_or_audio', [
    'form-label',
  ])
  const imgOrAudioSelect = createSelect(
    ['form-select'],
    '',
    [
      { value: 'image_box', text: 'Image Box', selected: true },
      { value: 'audio_box', text: 'Audio Box' },
    ],
    'new_img_or_audio',
    function (e) {
      let box = e.target.value === 'image_box' ? imageForm() : audioForm()
      getNode('.form-figure-box').remove()
      getNode('#add_form').appendChild(box)
    }
  )
  const captionBox = createElement(
    'div',
    '',
    ['form-group'],
    [
      createLabel('Check to add Caption first', 'caption_first_or_not', [
        'form-label',
      ]),
      createInput('checkbox', ['form-check-input'], 'caption_first_or_not'),
      createInput('', ['form-control'], 'new_caption', {
        placeholder: 'caption . . .',
      }),
    ]
  )
  function audioForm() {
    return createElement(
      'div',
      '',
      ['form-figure-box'],
      [
        createElement(
          'div',
          '',
          ['form-group'],
          [
            createLabel('Audio Source Link', 'new_audio', ['form-label']),
            createInput('', ['form-control'], 'new_audio'),
          ]
        ),
        createElement(
          'div',
          '',
          ['form-group'],
          [
            createLabel('Add DownLoad Option !', 'new_audio_download', [
              'form-label',
            ]),
            createInput('checkbox', ['form-control'], 'new_audio_download'),
          ]
        ),
      ]
    )
  }
  function imageForm() {
    return createElement(
      'div',
      '',
      ['form-figure-box'],
      [
        createElement(
          'div',
          '',
          ['form-group'],
          [
            createLabel('Image Source Link', 'new_image', ['form-label']),
            createInput('', ['form-control'], 'new_image'),
          ]
        ),
        createElement(
          'div',
          '',
          ['form-group'],
          [
            createLabel('Something about this image', 'new_image_alt', [
              'form-label',
            ]),
            createInput('', ['form-control'], 'new_image_alt'),
          ]
        ),
      ]
    )
  }
  return createForm(
    [],
    [label, imgOrAudioSelect, captionBox, imageForm()],
    'add_form'
  )
}

function createBrForm() {
  const p = createElement(
    'p',
    'This will break line within the parent block, next element or text will be on another line.',
    [],
    []
  )
  return createForm([], [p], 'add_form')
}

function createHrForm() {
  const p = createElement(
    'p',
    'This will break line horizontally through the whole page, next element or text will be on another line.',
    [],
    []
  )
  return createForm([], [p], 'add_form')
}

export {
  createBlockForm,
  createHeadingForm,
  createImageForm,
  createLinkForm,
  createParagraphForm,
  createListForm,
  createTextForm,
  createTableForm,
  createSelectionForm,
  createButtonForm,
  createInputForm,
  createFigureForm,
  createBrForm,
  createHrForm,
}
