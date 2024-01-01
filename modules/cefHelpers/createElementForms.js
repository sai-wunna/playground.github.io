import Document from '../dom/index.js'

const _ = Document()

function createBlockForm() {
  const label = _.createLabel('Content', 'new_block', ['form-label'])
  const input = _.createInput('', ['form-control'], 'new_block', {
    value: 'new block',
  })
  return _.createForm([], [label, input], 'add_form')
}

function createImageForm() {
  const srcLabel = _.createLabel('Source, link', 'new_image', ['form-label'])
  const srcInput = _.createInput('', ['form-control'], 'new_image', {
    placeholder: 'Only link is available now',
  })
  const altLabel = _.createLabel('Something about this image', 'new_alt', [
    'form-label',
  ])
  const altInput = _.createInput('', ['form-control'], 'new_alt', {
    placeholder: 'something about this image',
  })
  return _.createForm([], [srcLabel, srcInput, altLabel, altInput], 'add_form')
}

function createHeadingForm() {
  const label = _.createLabel('Heading Type', 'new_header', ['form-label'])
  const select = _.createSelect(
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
  const label2 = _.createLabel('Heading content', 'new_h_content', [
    'form-label',
  ])
  const input = _.createInput('', ['form-control'], 'new_h_content', {
    placeholder: 'The Heading',
  })
  return _.createForm([], [label, select, label2, input], 'add_form')
}

function createLinkForm() {
  const label = _.createLabel('URL', 'new_link', ['form-label'])
  const input = _.createInput('', ['form-control', 'my-2'], 'new_link', {
    placeholder: 'https://example.com',
  })
  const label2 = _.createLabel('Link Name', 'new_link_name', ['form-label'])
  const input2 = _.createInput('', ['form-control', 'my-2'], 'new_link_name')
  const select = _.createSelect(
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
      _.getNode('#new_link').placeholder = newPlaceholder
    },
    ''
  )
  const label3 = _.createLabel('Title for more information', 'new_title', [
    'form-label',
  ])
  const input3 = _.createInput('', ['form-control', 'my-1'], 'new_title')
  return _.createForm(
    [],
    [select, label, input, label2, input2, label3, input3],
    'add_form'
  )
}

function createParagraphForm() {
  const label = _.createLabel('Content of the paragraph', 'new_para', [
    'form-label',
  ])
  const textArea = _.createElement(
    'textarea',
    '',
    ['form-control'],
    [],
    'new_para'
  )
  return _.createForm([], [label, textArea], 'add_form')
}

function createButtonForm() {
  const label = _.createLabel('Button name', 'new_button', ['form-label'])
  const input = _.createInput('', ['form-control'], 'new_button', {
    value: 'Click Me',
  })
  return _.createForm([], [label, input], 'add_form')
}

function createInputForm() {
  // under construction
}

function createListForm() {
  const label = _.createLabel('List type', 'list_type', ['form-label'])
  const select = _.createSelect(
    ['form-select'],
    '',
    [
      { value: 'ol', text: 'Ordered List', selected: true },
      { value: 'ul', text: 'Unordered List' },
    ],
    'list_type'
  )
  const fragment = _.createFragment()
  function createListItem() {
    return _.createInput('', ['form-control', 'list-value'], '', {
      placeholder: 'list item',
    })
  }
  for (let i = 0; i < 3; i++) {
    fragment.appendChild(createListItem())
  }
  const del = _.createButton(
    'Del',
    ['btn', 'btn-sm', 'text-danger'],
    '',
    () => {
      const listItems = _.getAllNodes('.list-value')
      if (listItems.length === 2) return
      listItems[listItems.length - 1].remove()
    }
  )
  const add = _.createButton(
    'Add',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    () => {
      _.getNode('#add_form').appendChild(createListItem())
    }
  )
  const controllers = _.createElement(
    'div',
    '',
    ['d-flex', 'justify-content-between'],
    [del, add]
  )
  return _.createForm([], [controllers, select, fragment], 'add_form')
}

function createTextForm() {
  const label = _.createLabel('Short text', 'new_text', ['form-label'])
  const input = _.createInput('', ['form-control'], 'new_text')
  return _.createForm([], [label, input], 'add_form')
}

function createTableForm() {
  const tHLabel = _.createLabel('Table headers', '', ['form-label'])
  const tHRow = _.createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-h-cell')]
  )
  const tBLabel = _.createLabel('Table Body', '', ['form-label'])
  const tBRow = _.createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-b-cell')]
  )
  const tFLabel = _.createLabel('Table Footers', '', ['form-label'])
  const tFRow = _.createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
    [...createTRow('c-t-f-cell')]
  )
  function createTRow(type) {
    const fragment = _.createFragment()
    const del = _.createButton(
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
    const add = _.createButton(
      'Add',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e, type) => {
        _.insertBefore([addNewCell(type)], e.target)
      },
      type
    )
    return [del, fragment, add]
  }
  function addNewCell(type) {
    return _.createInput('', ['c-t-cell', `${type}`], '')
  }
  const addBodyRow = _.createButton(
    'Add Row',
    ['btn', 'btn-sm', 'text-primary', 'd-block'],
    '',
    (e) => {
      _.insertBefore(
        [
          _.createElement(
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
  return _.createForm(
    [],
    [tHLabel, tHRow, tBLabel, tBRow, addBodyRow, tFLabel, tFRow],
    'add_form'
  )
}

function createSelectionForm() {
  const label = _.createLabel('Options')
  const fragment = _.createFragment()
  const del = _.createButton(
    'Del',
    ['btn', 'btn-sm', 'text-danger'],
    '',
    (e) => {
      e.preventDefault()
      const options = _.getAllNodes('.option-data')
      if (options.length === 1) return
      options[options.length - 1].parentElement.remove()
    },
    ''
  )
  const add = _.createButton(
    'Add',
    ['btn', 'btn-sm', 'text-primary'],
    '',
    (e) => {
      e.preventDefault()
      const set = _.createElement(
        'div',
        '',
        ['my-1', 'd-flex'],
        [
          _.createInput('', ['option-value', 'form-control'], '', {
            placeholder: 'value',
            name: "select's value",
          }),
          _.createInput('', ['option-data', 'form-control'], '', {
            placeholder: 'option',
            name: "select's option",
          }),
        ]
      )
      _.getNode('#add_form').appendChild(set)
    },
    ''
  )
  for (let i = 0; i < 5; i++) {
    const value = _.createInput('', ['option-value', 'form-control'], '', {
      placeholder: 'value',
      name: "select's value",
    })
    const input = _.createInput('', ['option-data', 'form-control'], '', {
      placeholder: 'option',
      name: "select's option",
    })
    fragment.appendChild(
      _.createElement('div', '', ['my-1', 'd-flex'], [value, input])
    )
  }
  const controllers = _.createElement(
    'div',
    '',
    ['my-1', 'd-flex', 'justify-content-between'],
    [del, label, add]
  )
  return _.createForm([], [controllers, fragment], 'add_form')
}

function createFigureForm() {
  const label = _.createLabel('Image Box or Audio Box', 'new_img_or_audio', [
    'form-label',
  ])
  const imgOrAudioSelect = _.createSelect(
    ['form-select'],
    '',
    [
      { value: 'image_box', text: 'Image Box', selected: true },
      { value: 'audio_box', text: 'Audio Box' },
    ],
    'new_img_or_audio',
    function (e) {
      let box = e.target.value === 'image_box' ? imageForm() : audioForm()
      _.getNode('.form-figure-box').remove()
      _.getNode('#add_form').appendChild(box)
    }
  )
  const captionBox = _.createElement(
    'div',
    '',
    ['form-group'],
    [
      _.createLabel('Check to add Caption first', 'caption_first_or_not', [
        'form-label',
      ]),
      _.createInput('checkbox', ['form-check-input'], 'caption_first_or_not'),
      _.createInput('', ['form-control'], 'new_caption', {
        placeholder: 'caption . . .',
      }),
    ]
  )
  function audioForm() {
    return _.createElement(
      'div',
      '',
      ['form-figure-box'],
      [
        _.createElement(
          'div',
          '',
          ['form-group'],
          [
            _.createLabel('Audio Source Link', 'new_audio', ['form-label']),
            _.createInput('', ['form-control'], 'new_audio'),
          ]
        ),
        _.createElement(
          'div',
          '',
          ['form-group'],
          [
            _.createLabel('Add DownLoad Option !', 'new_audio_download', [
              'form-label',
            ]),
            _.createInput('checkbox', ['form-control'], 'new_audio_download'),
          ]
        ),
      ]
    )
  }
  function imageForm() {
    return _.createElement(
      'div',
      '',
      ['form-figure-box'],
      [
        _.createElement(
          'div',
          '',
          ['form-group'],
          [
            _.createLabel('Image Source Link', 'new_image', ['form-label']),
            _.createInput('', ['form-control'], 'new_image'),
          ]
        ),
        _.createElement(
          'div',
          '',
          ['form-group'],
          [
            _.createLabel('Something about this image', 'new_image_alt', [
              'form-label',
            ]),
            _.createInput('', ['form-control'], 'new_image_alt'),
          ]
        ),
      ]
    )
  }
  return _.createForm(
    [],
    [label, imgOrAudioSelect, captionBox, imageForm()],
    'add_form'
  )
}

function createBrForm() {
  const p = _.createElement(
    'p',
    'This will break line within the parent block, next element or text will be on another line.',
    [],
    []
  )
  return _.createForm([], [p], 'add_form')
}

function createHrForm() {
  const p = _.createElement(
    'p',
    'This will break line horizontally through the whole page, next element or text will be on another line.',
    [],
    []
  )
  return _.createForm([], [p], 'add_form')
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
