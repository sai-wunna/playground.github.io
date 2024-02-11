'use strict'

class CreateElementForms {
  constructor(doc) {
    this._ = doc
  }
  createBlockForm() {
    const label = this._.createLabel('Content', 'new_block', ['form-label'])
    const input = this._.createInput('', ['form-control'], 'new_block', {
      value: 'new block',
    })
    return this._.createForm([], [label, input], 'add_form')
  }

  createImageForm() {
    const srcLabel = this._.createLabel('Source, link', 'new_image', [
      'form-label',
    ])
    const srcInput = this._.createInput('', ['form-control'], 'new_image', {
      placeholder: 'Only link is available now',
    })
    const altLabel = this._.createLabel(
      'Something about this image',
      'new_alt',
      ['form-label']
    )
    const altInput = this._.createInput('', ['form-control'], 'new_alt', {
      placeholder: 'something about this image',
    })
    return this._.createForm(
      [],
      [srcLabel, srcInput, altLabel, altInput],
      'add_form'
    )
  }

  createHeadingForm() {
    const typeLabel = this._.createLabel('Heading Type', 'new_header', [
      'form-label',
    ])
    const typeSelect = this._.createSelect(
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
    const textIpLabel = this._.createLabel('Heading content', 'new_h_content', [
      'form-label',
    ])
    const textInput = this._.createInput(
      '',
      ['form-control'],
      'new_h_content',
      {
        placeholder: 'Hello World',
      }
    )
    return this._.createForm(
      [],
      [typeLabel, typeSelect, textIpLabel, textInput],
      'add_form'
    )
  }

  createLinkForm() {
    const linkSrcLabel = this._.createLabel('URL', 'new_link', ['form-label'])
    const linkSrcInput = this._.createInput(
      '',
      ['form-control', 'my-2'],
      'new_link',
      {
        placeholder: 'https://example.com',
      }
    )
    const linkNameLabel = this._.createLabel('Link Name', 'new_link_name', [
      'form-label',
    ])
    const linkNameInput = this._.createInput(
      '',
      ['form-control', 'my-2'],
      'new_link_name'
    )
    const linkTypeSelect = this._.createSelect(
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
        linkSrcInput.placeholder = newPlaceholder
      }
    )
    const linkTitleLabel = this._.createLabel(
      'Title for more information',
      'new_title',
      ['form-label']
    )
    const linkTitleInput = this._.createInput(
      '',
      ['form-control', 'my-1'],
      'new_title'
    )
    return this._.createForm(
      [],
      [
        linkTypeSelect,
        linkSrcLabel,
        linkSrcInput,
        linkNameLabel,
        linkNameInput,
        linkTitleLabel,
        linkTitleInput,
      ],
      'add_form'
    )
  }

  createParagraphForm() {
    const label = this._.createLabel('Content of the paragraph', 'new_para', [
      'form-label',
    ])
    const textArea = this._.createElement(
      'textarea',
      '',
      ['form-control'],
      [],
      'new_para'
    )
    return this._.createForm([], [label, textArea], 'add_form')
  }

  createButtonForm() {
    const label = this._.createLabel('Button name', 'new_button', [
      'form-label',
    ])
    const input = this._.createInput('', ['form-control'], 'new_button', {
      value: 'Click Me',
    })
    return this._.createForm([], [label, input], 'add_form')
  }

  createInputForm() {
    // under construction
  }

  createListForm() {
    const listTypeSelect = this._.createSelect(
      ['form-select', 'my-1'],
      '',
      [
        { value: 'ol', text: 'Ordered List', selected: true },
        { value: 'ul', text: 'Unordered List' },
      ],
      'list_type'
    )
    const fragment = this._.createFragment()
    const createListItem = () => {
      return this._.createInput(
        '',
        ['form-control', 'list-value', 'my-1'],
        '',
        {
          placeholder: 'list item',
        }
      )
    }
    for (let i = 0; i < 3; i++) {
      fragment.appendChild(createListItem())
    }
    const del = this._.createButton(
      'Del',
      ['btn', 'btn-sm', 'text-danger'],
      '',
      () => {
        const listItems = this._.getAllNodes('.list-value')
        if (listItems.length < 2) return
        listItems[listItems.length - 1].remove()
      }
    )
    const add = this._.createButton(
      'Add',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e) => {
        e.target.parentElement.parentElement.appendChild(createListItem())
      }
    )
    const controllers = this._.createElement(
      'div',
      '',
      ['d-flex', 'justify-content-between'],
      [del, add]
    )

    return this._.createForm(
      [],
      [controllers, listTypeSelect, fragment],
      'add_form'
    )
  }

  createSpanForm() {
    const label = this._.createLabel('Short text', 'new_text', ['form-label'])
    const input = this._.createInput('', ['form-control'], 'new_text')
    return this._.createForm([], [label, input], 'add_form')
  }
  createTableForm() {
    const createTRow = (type) => {
      const fragment = this._.createFragment()
      const del = this._.createButton(
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
      const add = this._.createButton(
        'Add',
        ['btn', 'btn-sm', 'text-primary'],
        '',
        (e) => {
          this._.insertBefore([addNewCell(type)], e.target)
        }
      )
      return [del, fragment, add]
    }
    const addNewCell = (type) => {
      return this._.createInput('', ['c-t-cell', `${type}`], '')
    }
    const tHLabel = this._.createLabel('Table headers', '', ['form-label'])
    const tHRow = this._.createElement(
      'div',
      '',
      ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
      [...createTRow('c-t-h-cell')]
    )
    const tBLabel = this._.createLabel('Table Body', '', ['form-label'])
    const tBRow = this._.createElement(
      'div',
      '',
      ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
      [...createTRow('c-t-b-cell')]
    )
    const tFLabel = this._.createLabel('Table Footers', '', ['form-label'])
    const tFRow = this._.createElement(
      'div',
      '',
      ['my-1', 'd-flex', 'flex-wrap', 'align-items-center'],
      [...createTRow('c-t-f-cell')]
    )

    const addBodyRow = this._.createButton(
      'Add Row',
      ['btn', 'btn-sm', 'text-primary', 'd-block'],
      '',
      (e) => {
        this._.insertBefore(
          [
            this._.createElement(
              'div',
              '',
              ['my-1', 'flex', 'flex-wrap', 'align-items-center'],
              [...createTRow('c-t-b-cell')]
            ),
          ],
          e.target
        )
      }
    )
    const form = this._.createForm(
      [],
      [tHLabel, tHRow, tBLabel, tBRow, addBodyRow, tFLabel, tFRow],
      'add_form'
    )
    return form
  }

  createSelectionForm() {
    const label = this._.createLabel('Options')
    const fragment = this._.createFragment()
    const del = this._.createButton(
      'Del',
      ['btn', 'btn-sm', 'text-danger'],
      '',
      (e) => {
        e.preventDefault()
        const options = this._.getAllNodes('.option-data')
        if (options.length === 1) return
        options[options.length - 1].parentElement.remove()
      }
    )
    const add = this._.createButton(
      'Add',
      ['btn', 'btn-sm', 'text-primary'],
      '',
      (e) => {
        e.preventDefault()
        const set = this._.createElement(
          'div',
          '',
          ['my-1', 'd-flex'],
          [
            this._.createInput('', ['option-value', 'form-control'], '', {
              placeholder: 'value',
              name: "select's value",
            }),
            this._.createInput('', ['option-data', 'form-control'], '', {
              placeholder: 'option',
              name: "select's option",
            }),
          ]
        )
        this._.getNode('#add_form').appendChild(set)
      }
    )
    for (let i = 0; i < 5; i++) {
      const value = this._.createInput(
        '',
        ['option-value', 'form-control'],
        '',
        {
          placeholder: 'value',
          name: "select's value",
        }
      )
      const input = this._.createInput(
        '',
        ['option-data', 'form-control'],
        '',
        {
          placeholder: 'option',
          name: "select's option",
        }
      )
      fragment.appendChild(
        this._.createElement('div', '', ['my-1', 'd-flex'], [value, input])
      )
    }
    const controllers = this._.createElement(
      'div',
      '',
      ['my-1', 'd-flex', 'justify-content-between'],
      [del, label, add]
    )

    return this._.createForm([], [controllers, fragment], 'add_form')
  }

  createOptionForm() {
    return this._.createForm(
      [],
      [
        this._.createLabel('Option Value', 'new_opt_value', ['form-label']),
        this._.createInput('', ['form-control'], 'new_opt_value'),

        this._.createLabel('Option Text', 'new_opt_text', ['form-label']),
        this._.createInput('', ['form-control'], 'new_opt_text'),
      ],
      'add_form'
    )
  }

  createFigureForm() {
    const label = this._.createLabel(
      'Image Box or Audio Box',
      'new_img_or_audio',
      ['form-label']
    )
    const imgOrAudioSelect = this._.createSelect(
      ['form-select'],
      '',
      [
        { value: 'image_box', text: 'Image Box', selected: true },
        { value: 'audio_box', text: 'Audio Box' },
      ],
      'new_img_or_audio',
      (e) => {
        let box = e.target.value === 'image_box' ? imageForm() : audioForm()
        this._.getNode('.form-figure-box').remove()
        this._.getNode('#add_form').appendChild(box)
      }
    )
    const captionBox = this._.createElement(
      'div',
      '',
      ['form-group'],
      [
        this._.createLabel(
          'Check to add Caption first',
          'caption_first_or_not',
          ['form-label']
        ),
        this._.createInput(
          'checkbox',
          ['form-check-input'],
          'caption_first_or_not'
        ),
        this._.createInput('', ['form-control'], 'new_caption', {
          placeholder: 'caption . . .',
        }),
      ]
    )
    const audioForm = () => {
      return this._.createElement(
        'div',
        '',
        ['form-figure-box'],
        [
          this._.createElement(
            'div',
            '',
            ['form-group'],
            [
              this._.createLabel('Audio Source Link', 'new_audio', [
                'form-label',
              ]),
              this._.createInput('', ['form-control'], 'new_audio'),
            ]
          ),
          this._.createElement(
            'div',
            '',
            ['form-group'],
            [
              this._.createLabel(
                'Add DownLoad Option !',
                'new_audio_download',
                ['form-label']
              ),
              this._.createInput(
                'checkbox',
                ['form-control'],
                'new_audio_download'
              ),
            ]
          ),
        ]
      )
    }
    const imageForm = () => {
      return this._.createElement(
        'div',
        '',
        ['form-figure-box'],
        [
          this._.createElement(
            'div',
            '',
            ['form-group'],
            [
              this._.createLabel('Image Source Link', 'new_image', [
                'form-label',
              ]),
              this._.createInput('', ['form-control'], 'new_image'),
            ]
          ),
          this._.createElement(
            'div',
            '',
            ['form-group'],
            [
              this._.createLabel(
                'Something about this image',
                'new_image_alt',
                ['form-label']
              ),
              this._.createInput('', ['form-control'], 'new_image_alt'),
            ]
          ),
        ]
      )
    }
    return this._.createForm(
      [],
      [label, imgOrAudioSelect, captionBox, imageForm()],
      'add_form'
    )
  }

  createBrForm() {
    return this._.createForm(
      [],
      [
        this._.createElement(
          'p',
          'This will break line within the parent block, next element or text will be on another line.',
          [],
          []
        ),
      ],
      'add_form'
    )
  }

  createHrForm() {
    return this._.createForm(
      [],
      [
        this._.createElement(
          'p',
          'This will break line horizontally through the whole page, next element or text will be on another line.',
          [],
          []
        ),
      ],
      'add_form'
    )
  }

  createBlockQuoteForm() {
    return this._.createForm(
      [],
      [
        this._.createLabel('Cited Link', 'new_bq_cite', ['form-label']),
        this._.createInput('', ['form-control'], 'new_bq_cite', {
          placeholder: 'Many Characters ( Star Wars )',
        }),
        this._.createLabel('Content', 'new_bq_content', ['form-label']),
        this._.createInput('', ['form-control'], 'new_bq_content', {
          placeholder: 'May the Force be with You',
        }),
      ],
      'add_form'
    )
  }
}

export default CreateElementForms
