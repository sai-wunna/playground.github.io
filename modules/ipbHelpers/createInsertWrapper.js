'use strict'

import Document from '../dom/index.js'
const _ = Document()

const drag_drop_box = _.createElement(
  '',
  '',
  [
    'drag-drop-box',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-direction-column',
  ],
  [_.createElement('p', 'Drag and Drop here')]
)

const confirmInsertBtn = _.createButton(
  '- - - - - - - -',
  ['btn', 'btn-sm', 'text-primary'],
  'insert_web_confirm_btn'
)

const fileInfo = _.createSpan('-', ['insert-info'])

function createInsertWrapper() {
  return _.createElement(
    '',
    '',
    ['insert-wrapper'],
    [
      _.createElement(
        '',
        '',
        ['insert-box', 'd-flex', 'flex-direction-column'],
        [
          fileInfo,
          _.createElement(
            '',
            '',
            ['d-flex', 'justify-content-between', 'prebuild-webs-box'],
            [
              _.createElement('', '', ['available-prebuilt-webs']),
              drag_drop_box,
            ]
          ),
          _.createElement(
            '',
            '',
            [
              'confirm-insert-box',
              'd-flex',
              'align-items-center',
              'justify-content-between',
            ],
            [
              _.createSpan('Current project will be removed !', [
                'insert-warning',
              ]),
              confirmInsertBtn,
            ]
          ),
        ]
      ),
    ]
  )
}

export { createInsertWrapper, drag_drop_box, confirmInsertBtn, fileInfo }
