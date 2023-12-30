import {
  createButton,
  createElement,
  createForm,
  createInput,
  createLabel,
  createSelect,
  getAllNodes,
  getNode,
} from '../dom/index.js'
import { changeAppliedStyes } from '../stylers.js'
import { createUnitSelector, removeParentBtn } from './helper/creator.js'
import {
  manageBOO,
  calBoxShadowValue,
  calGrdValue,
  calMNPSideValue,
  calTextDecoration,
  calTransitionValues,
  calTextShadowValue,
  calTransformValue,
  hexToRgb,
} from './helper/keyValueExtractor.js'

// sizing --------------
// width / max-width / min-width / width-auto / width in px-% /
// height / max-height / min-height / height-auto / height in px-% /
// box-sizing ( border-box, content-box )
// gap
// margin / margin-top / margin-bottom / margin-right / margin-left / margin-auto / margin in px-%-em
// padding / padding-top / padding-bottom / padding-right / padding-left / padding-auto / padding in px-%-em

let spamBlocker

function createSizingForm() {
  const widthBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Width', 'cs_width', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_width', '', '', (e) =>
        changeStyle(
          'width',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const minWidthBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Min-Width', 'cs_min_width', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_min_width', '', '', (e) =>
        changeStyle(
          'min-width',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const maxWidthBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Max-Width', 'cs_max_width', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_max_width', '', '', (e) =>
        changeStyle(
          'max-width',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const autoWidthBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Width Auto !', 'cs_auto_width', ['cs-label']),
      createInput('checkbox', ['cs-checkbox'], 'cs_auto_width', '', '', (e) =>
        changeStyle('width', e.target.checked ? 'auto' : 'inherit')
      ),
    ]
  )
  const heightBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Height', 'cs_height', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_height', '', '', (e) =>
        changeStyle(
          'height',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const minHeightBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Min-Height', 'cs_min_height', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_min_height', '', '', (e) =>
        changeStyle(
          'min-height',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const maxHeightBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Max-Height', 'cs_max_height', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_max_height', '', '', (e) =>
        changeStyle(
          'max-height',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const autoHeightBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Height Auto !', 'cs_auto_height', ['cs-label']),
      createInput('checkbox', ['cs-checkbox'], 'cs_auto_height', '', '', (e) =>
        changeStyle('height', e.target.checked ? 'auto' : 'inherit')
      ),
    ]
  )
  const boxSizingBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Box sizing', 'cs_bs', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'border-box', text: 'border-box' },
          { value: 'content-box', text: 'content-box' },
        ],
        'cs_bs',
        (e) => changeStyle('box-sizing', e.target.value)
      ),
    ]
  )
  const gapBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Gap', '', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_gap_y', '', '', function (e) {
        const unit = getNode('#unit_selector').value
        changeStyle(
          'gap',
          `${e.target.value || 0}${unit} ${
            getNode('#cs_gap_x').value || 0
          }${unit}`
        )
      }),
      createInput('number', ['cs-num-input'], 'cs_gap_x', '', '', function (e) {
        const unit = getNode('#unit_selector').value
        changeStyle(
          'gap',
          `${getNode('#cs_gap_y').value || 0}${unit} ${
            e.target.value || 0
          }${unit}`
        )
      }),
    ]
  )
  const marginBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Margin', 'cs_margin', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'All side' },
          { value: 'right', text: 'right' },
          { value: 'top', text: 'top' },
          { value: 'bottom', text: 'bottom' },
          { value: 'left', text: 'left' },
          { value: 'v_center', text: 'vertical center' },
          { value: 'h_center', text: 'horizontal center' },
        ],
        'cs_margin_side'
      ),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_margin',
        '',
        '',
        function change(e) {
          changeStyle(
            ...calMNPSideValue(
              getNode('#cs_margin_side').value,
              'margin',
              `${e.target.value}${getNode('#unit_selector').value}`
            )
          )
        }
      ),
    ]
  )
  const paddingBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Padding', 'cs_padding', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'All side' },
          { value: 'top', text: 'top' },
          { value: 'right', text: 'right' },
          { value: 'bottom', text: 'bottom' },
          { value: 'left', text: 'left' },
        ],
        'cs_padding_side'
      ),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_padding',
        '',
        '',
        function (e) {
          changeStyle(
            ...calMNPSideValue(
              getNode('#cs_padding_side').value,
              'padding',
              `${e.target.value}${getNode('#unit_selector').value}`
            )
          )
        }
      ),
    ]
  )
  const objectFitBox = createElement(
    '',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Object-fit', 'cs_obj_fit', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'fill', text: 'Fill' },
          { value: 'contain', text: 'Contain' },
          { value: 'cover', text: 'Cover' },
          { value: 'none', text: 'None' },
          { value: 'scale-down', text: 'Scale-down' },
        ],
        'cs_obj_fit',
        (e) => changeStyle('object-fit', e.target.value)
      ),
    ]
  )
  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      widthBox,
      minWidthBox,
      maxWidthBox,
      autoWidthBox,
      heightBox,
      minHeightBox,
      maxHeightBox,
      autoHeightBox,
      boxSizingBox,
      gapBox,
      marginBox,
      paddingBox,
      objectFitBox,
    ]
  )
}

// position ---------------
// position ( inherit , absolute , fixed , relative )
// top / left / right / bottom
// z-index ( number , inherit , auto , revert-layer , revert )
// overflow (visible, hidden,  auto , scroll ) / overflow-x / overflow-y

function createPositionForm() {
  const positionBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Position', 'cs_position', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'inherit', text: 'inherit' },
          { value: 'absolute', text: 'absolute' },
          { value: 'fixed', text: 'fixed' },
          { value: 'relative', text: 'relative' },
          { value: 'sticky', text: 'sticky' },
          { value: 'static', text: 'static' },
        ],
        'cs_position',
        (e) => changeStyle('position', e.target.value)
      ),
    ]
  )
  const floatBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Float', 'cs_float', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'none', text: 'None' },
          { value: 'left', text: 'Left' },
          { value: 'right', text: 'Right' },
          { value: 'inline-start', text: 'Inline-Start' },
          { value: 'inline-end', text: 'Inline-End' },
        ],
        'cs_float',
        (e) => changeStyle('float', e.target.value)
      ),
    ]
  )
  const distanceBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Distance', 'cs_distance', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'top', text: 'Top' },
          { value: 'right', text: 'Right' },
          { value: 'bottom', text: 'Bottom' },
          { value: 'left', text: 'Left' },
        ],
        'cs_distance_side'
      ),
      createInput('number', ['cs-num-input'], 'cs_distance', '', '', (e) =>
        changeStyle(
          getNode('#cs_distance_side').value,
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const zIndexBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Z-index', 'cs_zIndex', ['cs-label']),
      createInput('number', ['cs-select'], 'cs_zIndex', '', '', (e) =>
        changeStyle('z-index', parseInt(e.target.value))
      ),
    ]
  )
  const zIndexAutoBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Z-index Auto', 'cs_zIndex_auto', ['cs-label']),
      createInput('checkbox', ['cs-checkbox'], 'cs_zIndex_auto', '', '', (e) =>
        changeStyle('z-index', e.target.checked ? 'auto' : 1)
      ),
    ]
  )
  const overFlowBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Over-Flow', 'cs_overflow', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'overflow', text: 'Over Flow' },
          { value: 'overflow-y', text: 'Over Flow-Y' },
          { value: 'overflow-x', text: 'Over Flow-X' },
        ],
        'cs_overflow'
      ),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'auto', text: 'Auto' },
          { value: 'scroll', text: 'Scrollable' },
          { value: 'hidden', text: 'Hide' },
          { value: 'visible', text: 'Visible' },
        ],
        'cs_overflow_style',
        (e) => changeStyle(getNode('#cs_overflow').value, e.target.value)
      ),
    ]
  )
  let transformList = ['translate']
  const transformBox = createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Transform', '', ['cs-label']),
          createSelect(
            ['cs-select'],
            '',
            [
              { value: 'translate', text: 'Translate' },
              { value: 'rotate', text: 'Rotate' },
              { value: 'skew', text: 'Skew' },
              { value: 'scale', text: 'Scale' },
              { value: 'perspective', text: 'Perspective' },
              { value: 'translate3d', text: 'Translate 3D' },
              { value: 'rotate3d', text: 'Rotate 3D' },
            ],
            'cs_transform_type'
          ),
          createButton('Add', ['inline-btn', 'text-primary'], '', function (e) {
            const key = getNode('#cs_transform_type').value
            if (transformList.findIndex((one) => one === key) !== -1) return
            transformList.push(key)
            e.target.parentElement.parentElement.appendChild(
              transformListForm(key)
            )
          }),
          createButton(
            'Set Values',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              changeStyle('transform', calTransformValue(transformList))
            }
          ),
        ]
      ),
      transformListForm('translate'),
    ],
    'transform_box'
  )
  function transformListForm(type) {
    function removeBtn(key) {
      return createButton('Del', ['inline-btn', 'text-danger'], '', (e) => {
        e.preventDefault()
        e.target.parentElement.remove()
        transformList = transformList.filter((one) => one !== key)
      })
    }
    if (type === 'translate') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Translate', '', ['cs-label']),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate-value'],
            '',
            { value: '-50' }
          ),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate-value'],
            '',
            { value: '-50' }
          ),
          removeBtn('translate'),
        ]
      )
    } else if (type === 'rotate') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Rotate', '', ['cs-label']),
          createInput('number', ['cs-num-input', 'cs-trans-rotate-value'], '', {
            value: 15,
          }),
          removeBtn('rotate'),
        ]
      )
    } else if (type === 'scale') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Scale', '', ['cs-label']),
          createInput('number', ['cs-num-input', 'cs-trans-scale-value'], '', {
            value: 1.1,
          }),
          createInput('number', ['cs-num-input', 'cs-trans-scale-value'], '', {
            value: 1.1,
          }),
          removeBtn('scale'),
        ]
      )
    } else if (type === 'skew') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Skew', '', ['cs-label']),
          createInput('number', ['cs-num-input', 'cs-trans-skew-value'], '', {
            value: 45,
          }),
          createInput('number', ['cs-num-input', 'cs-trans-skew-value'], '', {
            value: 45,
          }),
          removeBtn('skew'),
        ]
      )
    } else if (type === 'perspective') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Perspective', '', ['cs-label']),
          createInput('number', ['cs-num-input', 'cs-trans-pov-value'], '', {
            value: 1000,
          }),
          removeBtn('perspective'),
        ]
      )
    } else if (type === 'rotate3d') {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Rotate 3D', '', ['cs-label']),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 10 }
          ),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 30 }
          ),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 50 }
          ),
          removeBtn('rotate3d'),
        ]
      )
    } else {
      return createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Translate 3D', '', ['cs-label']),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate3d-value'],
            '',
            { value: 10 }
          ),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate3d-value'],
            '',
            { value: 30 }
          ),
          createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate3d-value'],
            '',
            { value: 40 }
          ),
          removeBtn('translate3d'),
        ]
      )
    }
  }
  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      positionBox,
      distanceBox,
      floatBox,
      zIndexBox,
      zIndexAutoBox,
      overFlowBox,
      transformBox,
    ]
  )
}

// typography
// font-family / font-size / font-style / font-weight
// line-height / letter-spacing / color / text-decoration / text-align / text-shadow
function createTypographyForm() {
  const fsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Font-size', 'cs_font_size', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_font_size', '', '', (e) =>
        changeStyle(
          'font-size',
          `${e.target.value}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const ffBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Font-family', 'cs_font_family', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'Arial', text: 'Arial' },
          { value: 'Helvetica', text: 'Helvetica' },
          { value: 'Times New Roman', text: 'Times New Roman' },
          { value: 'Courier New', text: 'Courier New' },
          { value: 'Verdana', text: 'Verdana' },
          { value: 'Georgia', text: 'Georgia' },
          { value: 'Comic Sans MS', text: 'Comic Sans MS' },
          { value: 'Impact', text: 'Impact' },
          { value: 'Trebuchet MS', text: 'Trebuchet MS' },
          { value: 'Palatino', text: 'Palatino' },
          { value: "'Circular', sans-serif", text: 'Circular' },
        ],
        'cs_font_family',
        (e) => changeStyle('font-family', e.target.value)
      ),
    ]
  )
  const fStyleBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Font-style', 'cs_font_style', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'normal', text: 'Normal' },
          { value: 'italic', text: 'Italic' },
          { value: 'oblique', text: 'Oblique' },
        ],
        'cs_font_style',
        (e) => changeStyle('font-style', e.target.value)
      ),
    ]
  )
  const fwBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Font-weight', 'cs_font_weight', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_font_weight', '', '', (e) =>
        changeStyle('font-weight', parseInt(e.target.value))
      ),
    ]
  )
  const lineHBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Line-height', 'cs_line_height', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_line_height', '', '', (e) =>
        changeStyle(
          'line-height',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const letterSpcBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Letter Spacing', 'cs_letter_spacing', ['cs-label']),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_letter_spacing',
        '',
        '',
        (e) =>
          changeStyle(
            'letter-spacing',
            `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
          )
      ),
    ]
  )
  const colorBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Color', 'cs_color', ['cs-label']),
      createInput(
        'color',
        ['cs-color-input'],
        'cs_color',
        { value: '#000000' },
        '',
        (e) => changeStyle('color', e.target.value)
      ),
    ]
  )
  const textDecoBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Text Decoration', 'cs_text_deco', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'none', text: 'None' },
          { value: 'underline', text: 'Underline' },
        ],
        'cs_text_deco',
        (e) => changeStyle('text-decoration', e.target.value)
      ),
    ]
  )
  const decoTpBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Text Decoration Types', 'cs_underline_type', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'dotted', text: 'Dotted' },
          { value: 'wavy', text: 'Wavy' },
        ],
        'cs_underline_type',
        function (e) {
          const type = e.target.value
          const color = getNode('#cs_underline_color').value
          const value = calTextDecoration(type, color)
          changeStyle('text-decoration', value)
        }
      ),
    ]
  )
  const decoColorBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Text Decoration Color', 'cs_underline_color', ['cs-label']),
      createInput(
        'color',
        ['cs-color-input'],
        'cs_underline_color',
        { value: '#000000' },
        '',
        function (e) {
          const type = getNode('#cs_underline_type').value
          const color = e.target.value
          const value = calTextDecoration(type, color)
          changeStyle('text-decoration', value)
        }
      ),
    ]
  )
  const textAlignBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Text align', 'cs_text_align', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'start', text: 'start' },
          { value: 'end', text: 'end' },
          { value: 'center', text: 'center' },
          { value: 'justify', text: 'justify' },
        ],
        'cs_text_align',
        (e) => changeStyle('text-align', e.target.value)
      ),
    ]
  )
  const textIdtBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Text Indent', 'cs_text_idt', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_text_idt', '', '', (e) =>
        changeStyle(
          'text-indent',
          `${e.target.value}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const writingModeBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Writing Mode', 'cs_writing_mode', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'horizontal-tb', text: 'Horizontal-tb' },
          { value: 'vertical-lr', text: 'Vertical-lr' },
          { value: 'vertical-rl', text: 'Vertical-rl' },
        ],
        'cs_writing_mode',
        (e) => changeStyle('writing-mode', e.target.value)
      ),
    ]
  )
  const textShadowBox = createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Text-Shadow', '', ['cs-label']),
          createButton('Add', ['inline-btn'], '', function (e) {
            e.preventDefault()
            if (getAllNodes('.cs-ts-xo').length > 2) return
            e.target.parentElement.parentElement.appendChild(
              createTextShadowValue()
            )
          }),
        ]
      ),
      createTextShadowValue(),
    ]
  )
  function createTextShadowValue() {
    return createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        createInput(
          'number',
          ['cs-num-input', 'cs-ts-xo'],
          '',
          { value: 2 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-ts-yo'],
          '',
          { value: 2 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-ts-blur'],
          '',
          { value: 5 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        createInput(
          'color',
          ['cs-color-input', 'cs-ts-color'],
          '',
          { value: '#000000' },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-ts-alpha'],
          '',
          { value: 5, min: 1, max: 10 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        removeParentBtn(),
      ]
    )
  }
  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      fsBox,
      ffBox,
      fStyleBox,
      fwBox,
      letterSpcBox,
      lineHBox,
      colorBox,
      textDecoBox,
      decoTpBox,
      decoColorBox,
      textAlignBox,
      textIdtBox,
      writingModeBox,
      textShadowBox,
    ]
  )
}

// background
// background ( liner gradient )
// background-image / background-position / background-repeat / background-size / background-clip
// background-attachment
function createBackgroundForm() {
  const bgBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Background', 'cs_background', ['cs-label']),
      createInput(
        'color',
        ['cs-color-input'],
        'cs_background',
        { value: '#000000' },
        '',
        function (e) {
          let opacity = Math.min(
            Math.max(parseInt(getNode('#cs_bg_opacity').value), 1),
            10
          )
          changeStyle(
            'background-color',
            `rgba(${hexToRgb(e.target.value)},${opacity / 10})`
          )
        }
      ),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_bg_opacity',
        { value: 10 },
        '',
        function (e) {
          let opacity = Math.min(Math.max(parseInt(e.target.value), 1), 10)
          changeStyle(
            'background-color',
            `rgba(${hexToRgb(getNode('#cs_background').value)},${opacity / 10})`
          )
        }
      ),
    ]
  )
  function createGrdColorIp() {
    return createInput(
      'color',
      ['cs-color-input', 'bg-grd-color'],
      '',
      {
        value: '#000000',
      },
      '',
      (e) =>
        changeStyle(
          'background',
          calGrdValue(
            getNode('#cs_bg_type').value,
            getNode('#cs_grd_deg').value,
            getAllNodes('.bg-grd-color')
          )
        )
    )
  }
  const bgGradientBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Gradient', 'cs_bg_type', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'linear', text: 'Liner Gradient' },
          { value: 'radial', text: 'Radial Gradient' },
        ],
        'cs_bg_type'
      ),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_grd_deg',
        {
          value: 45,
          min: 0,
          max: 360,
        },
        '',
        function (e) {
          const colorNodes = getAllNodes('.bg-grd-color')
          const value = calGrdValue(
            getNode('#cs_bg_type').value,
            parseInt(e.target.value),
            colorNodes
          )
          changeStyle('background', value)
        }
      ),
      createGrdColorIp(),
      createGrdColorIp(),
      createGrdColorIp(),
    ]
  )
  const bgImgBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Image', 'cs_bg_img', ['cs-label']),
      createInput(
        '',
        ['cs-text-input'],
        'cs_bg_img',
        { placeholder: 'use link only' },
        '',
        (e) => changeStyle('background-image', `url(${e.target.value})`)
      ),
    ]
  )
  const bgSizeBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Size', 'cs_bg_size', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_bg_size', '', '', (e) =>
        changeStyle(
          'background-size',
          `${parseInt(e.target.value)}${getNode('#unit_selector').value}`
        )
      ),
    ]
  )
  const bgSizeAutoBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Size ( predefined )', 'cs_bg_size_pre', [
        'cs-label',
      ]),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'contain', text: 'Contain' },
          { value: 'cover', text: 'Cover' },
          { value: 'auto, auto', text: 'Auto' },
        ],
        'cs_bg_size_pre',
        (e) => changeStyle('background-size', e.target.value)
      ),
    ]
  )
  const bgRpBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Repeat', 'cs_bg_rp', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'no-repeat', text: 'No repeat' },
          { value: 'repeat', text: 'Repeat' },
          { value: 'repeat-x', text: 'Repeat-X' },
          { value: 'space', text: 'Space' },
          { value: 'round', text: 'Round' },
          { value: 'space-repeat', text: 'Space repeat' },
        ],
        'cs_bg_rp',
        (e) => changeStyle('background-repeat', e.target.value)
      ),
    ]
  )
  const bgPstBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Position', 'cs_bg_pst', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'top', text: 'Top' },
          { value: 'right', text: 'Right' },
          { value: 'bottom', text: 'Bottom' },
          { value: 'left', text: 'Left' },
          { value: 'center', text: 'Center' },
          { value: 'top 25% left 50%', text: 'Top Center' },
          { value: 'bottom 25% left 50%', text: 'Bottom Center' },
          { value: 'left 25% top 50%', text: 'Left Center' },
          { value: 'right 25% top 50%', text: 'Right Center' },
        ],
        'cs_bg_pst',
        (e) => changeStyle('background-position', e.target.value)
      ),
    ]
  )
  const bgClipBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Clip', 'cs_bg_clip', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'border-box', text: 'Border-box' },
          { value: 'padding-box', text: 'Padding-box' },
          { value: 'content-box', text: 'Content-box' },
          { value: 'text', text: 'Text' },
        ],
        'cs_bg_clip',
        function (e) {
          if (e.target.value === 'text') {
            changeSerialStyles(
              ['background-clip', '-webkit-background-clip', 'color'],
              ['text', 'text', 'transparent']
            )
          } else {
            changeStyle('background-clip', e.target.value)
          }
        }
      ),
    ]
  )
  const bgAttachBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Background Attachment', 'cs_bg_attach', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'scroll', text: 'Scroll' },
          { value: 'fixed', text: 'Fixed' },
          { value: 'local', text: 'local' },
          { value: 'local, scroll', text: 'Local, scroll' },
          { value: 'scroll, local', text: 'Scroll, local' },
        ],
        'cs_bg_attach',
        (e) => changeStyle('background-attachment', e.target.value)
      ),
    ]
  )
  // to add -webkit- for text-image and others??????????????????????
  // to add -webkit- for text-image and others??????????????????????
  // to add -webkit- for text-image and others??????????????????????
  // to add -webkit- for text-image and others??????????????????????
  // to add -webkit- for text-image and others??????????????????????
  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      bgBox,
      bgGradientBox,
      bgImgBox,
      bgSizeBox,
      bgSizeAutoBox,
      bgClipBox,
      bgAttachBox,
      bgPstBox,
      bgRpBox,
    ]
  )
}

// border
// border ( none , solid , dashed , dotted ) / border-width / border-color
// border-top / border-bottom / border-right / border-left
// border-collapse ( collapse , separate )
// border-radius ( pure / px-% ,  )
//outlines
// outline ( dash/dotted/solid ?color , ?thick double  ?color , width-px ridge color)
// outline-offset

function createBorderAndOutlinesForm() {
  //  here boo is border or outline
  const bOOBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('BORDER', 'cs_bOOChooser', ['cs-label'], 'bOOChooser'),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'border', text: 'Border' },
          { value: 'outline', text: 'Outline' },
        ],
        'cs_bOOChooser',
        (e) =>
          (getNode('#bOOChooser').textContent = e.target.value.toUpperCase())
      ),
    ]
  )
  const bOOWidthBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Width', 'cs_boo_width', ['cs-label']),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_boo_width',
        { value: 2 },
        '',
        function (e) {
          const [key, value] = manageBOO(
            getNode('#cs_bOOChooser').value,
            getNode('#cs_boo_side').value,
            getNode('#cs_boo_type').value,
            `${parseInt(e.target.value)}${getNode('#unit_selector').value}`,
            getNode('#cs_boo_color').value
          )
          changeStyle(key, value)
        }
      ),
    ]
  )
  const bOOTypeBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Style', 'cs_boo_type', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'solid', text: 'Solid' },
          { value: 'dotted', text: 'Dots' },
          { value: 'dashed', text: 'Dash' },
          { value: 'double', text: 'Double' },
          { value: 'ridge', text: 'Ridge' },
        ],
        'cs_boo_type',
        function (e) {
          const [key, value] = manageBOO(
            getNode('#cs_bOOChooser').value,
            getNode('#cs_boo_side').value,
            e.target.value,
            `${parseInt(getNode('#cs_boo_width').value)}${
              getNode('#unit_selector').value
            }`,
            getNode('#cs_boo_color').value
          )
          changeStyle(key, value)
        }
      ),
    ]
  )
  const bOOColorBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Color', 'cs_boo_color', ['cs-label']),
      createInput(
        'color',
        ['cs-color-input'],
        'cs_boo_color',
        { value: '#000000' },
        '',
        function (e) {
          const [key, value] = manageBOO(
            getNode('#cs_bOOChooser').value,
            getNode('#cs_boo_side').value,
            getNode('#cs_boo_type').value,
            `${parseInt(getNode('#cs_boo_width').value)}${
              getNode('#unit_selector').value
            }`,
            e.target.value
          )
          changeStyle(key, value)
        }
      ),
    ]
  )
  const bOOSideBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Side', 'cs_boo_side', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'All side' },
          { value: 'right', text: 'right' },
          { value: 'top', text: 'top' },
          { value: 'bottom', text: 'bottom' },
          { value: 'left', text: 'left' },
        ],
        'cs_boo_side'
      ),
    ]
  )
  const rmBorderBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Remove border', 'cs_rm_border', ['cs-label']),
      createInput('checkbox', ['cs-checkbox'], 'cs_rm_border', '', '', (e) =>
        changeStyle('border', e.target.checked ? 'none' : '2px solid')
      ),
    ]
  )
  const rmOutlineBox = createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      createLabel('Remove outline', 'cs_rm_outline', ['cs-label']),
      createInput('checkbox', ['cs-checkbox'], 'cs_rm_outline', '', '', (e) =>
        changeStyle('outline', e.target.checked ? 'none' : '2px solid')
      ),
    ]
  )
  const borderRadiusBox = createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      createLabel('Border Radius', '', ['cs-label']),
      createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createInput(
            'number',
            ['cs-num-input'],
            'cs_border_r_one',
            '',
            '',
            function (e) {
              const unit = getNode('#unit_selector').value
              const one = `${e.target.value}${unit}`
              const two = `${getNode('#cs_border_r_two').value}${unit}`
              const three = `${getNode('#cs_border_r_three').value}${unit}`
              const four = `${getNode('#cs_border_r_four').value}${unit}`
              changeStyle('border-radius', `${one} ${two} ${three} ${four}`)
            }
          ),
          createInput(
            'number',
            ['cs-num-input'],
            'cs_border_r_two',
            '',
            '',
            function (e) {
              const unit = getNode('#unit_selector').value
              const one = `${getNode('#cs_border_r_one').value}${unit}`
              const two = `${e.target.value}${unit}`
              const three = `${getNode('#cs_border_r_three').value}${unit}`
              const four = `${getNode('#cs_border_r_four').value}${unit}`
              changeStyle('border-radius', `${one} ${two} ${three} ${four}`)
            }
          ),
          createInput(
            'number',
            ['cs-num-input'],
            'cs_border_r_three',
            '',
            '',
            function (e) {
              const unit = getNode('#unit_selector').value
              const one = `${getNode('#cs_border_r_one').value}${unit}`
              const two = `${getNode('#cs_border_r_two').value}${unit}`
              const three = `${e.target.value}${unit}`
              const four = `${getNode('#cs_border_r_four').value}${unit}`
              changeStyle('border-radius', `${one} ${two} ${three} ${four}`)
            }
          ),
          createInput(
            'number',
            ['cs-num-input'],
            'cs_border_r_four',
            '',
            '',
            function (e) {
              const unit = getNode('#unit_selector').value
              const one = `${getNode('#cs_border_r_one').value}${unit}`
              const two = `${getNode('#cs_border_r_two').value}${unit}`
              const three = `${getNode('#cs_border_r_three').value}${unit}`
              const four = `${e.target.value}${unit}`
              changeStyle('border-radius', `${one} ${two} ${three} ${four}`)
            }
          ),
        ]
      ),
    ]
  )
  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      bOOBox,
      bOOWidthBox,
      bOOSideBox,
      bOOTypeBox,
      bOOColorBox,
      rmBorderBox,
      rmOutlineBox,
      borderRadiusBox,
    ]
  )
}

// miscellaneous
// opacity ( 0 to 1 ) / visibility ( visible , hidden ) / cursor ( pointer, zoom)
// transition ( all 0.3s ( ease , ease-in , ease-in-out) )
// transform ( scale (n1, n2) , translate (y, x) , skew(...) , rotate(n-deg) )
// filter ( blur , brightness , contrast , drop-shadow , gray-scale, hue-rotate , invert , opacity, saturate ,sepia)
// backdrop-filter ( blur , invert , sepia )

function createMiscellaneousForm() {
  const opacityBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Opacity 0 - 10', 'cs_opacity', ['cs-label']),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_opacity',
        { min: 0, max: 10 },
        '',
        (e) =>
          changeStyle(
            'opacity',
            ` ${Math.min(Math.max(e.target.value, 1), 10) / 10}`
          )
      ),
    ]
  )
  const visibilityBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Visibility', 'cs_visibility', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'visible', text: 'Visible' },
          { value: 'hidden', text: 'Hidden' },
          { value: 'collapse', text: 'Collapse' },
        ],
        'cs_visibility',
        (e) => changeStyle('visibility', e.target.value)
      ),
    ]
  )
  const cursorBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Cursor', 'cs_cursor', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'help', text: 'Help' },
          { value: 'wait', text: 'Wait' },
          { value: 'crosshair', text: 'Crosshair' },
          { value: 'not-allowed', text: 'Not-allowed' },
          { value: 'zoom-in', text: 'Zoom-in' },
          { value: 'grab', text: 'Grab' },
        ],
        'cs_cursor',
        (e) => changeStyle('cursor', e.target.value)
      ),
    ]
  )
  const backdropFilterBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Backdrop Filter', 'cs_bd_filter', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'blur', text: 'Blur' },
          { value: 'invert', text: 'Invert' },
          { value: 'sepia', text: 'Sepia' },
        ],
        'cs_bd_filter_tp'
      ),
      createInput('number', ['cs-num-input'], 'cs_bd_filter', '', '', (e) =>
        changeStyle(
          'backdrop-filter',
          `${getNode('#cs_bd_filter_tp').value}(${parseInt(e.target.value)}${
            getNode('#unit_selector').value
          })`
        )
      ),
    ]
  )
  const filterBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Filter', 'cs_filter', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'blur', text: 'Blur' },
          { value: 'brightness', text: 'Brightness' },
          { value: 'contrast', text: 'Contrast' },
          { value: 'drop-shadow', text: 'Drop Shadow' },
          { value: 'grayscale', text: 'Gray Scale' },
          { value: 'hue-rotate', text: 'Hue Rotate' },
          { value: 'invert', text: 'Invert' },
          { value: 'opacity', text: 'Opacity' },
          { value: 'saturate', text: 'Saturate' },
          { value: 'sepia', text: 'Sepia' },
        ],
        'cs_filter_tp'
      ),
      createInput('number', ['cs-num-input'], 'cs_filter', '', '', (e) =>
        changeStyle(
          'filter',
          `${getNode('#cs_filter_tp').value}(${parseInt(e.target.value)}${
            getNode('#unit_selector').value
          })`
        )
      ),
    ]
  )
  const boxShadowBox = createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Box-Shadow', '', ['cs-label']),
          createButton('Add', ['inline-btn', 'text-primary'], '', function (e) {
            if (getAllNodes('.cs-bs-type').length > 2) return
            e.target.parentElement.parentElement.appendChild(
              boxShadowValueForm()
            )
          }),
        ]
      ),
      createElement('div', '', ['cs-ip-gp']),
      boxShadowValueForm(),
    ]
  )
  function boxShadowValueForm() {
    return createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        createSelect(['cs-select', 'cs-bs-type'], '', [
          { value: '', text: 'Out' },
          { value: 'inset', text: 'Inset' },
        ]),
        createInput(
          'number',
          ['cs-num-input', 'cs-bs-xo'],
          '',
          { value: 5 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-bs-yo'],
          '',
          { value: 5 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-bs-blur'],
          '',
          { value: 2 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-bs-spr'],
          '',
          { value: 2 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        createInput(
          'color',
          ['cs-color-input', 'cs-bs-color'],
          '',
          { value: '#000000' },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        createInput(
          'number',
          ['cs-num-input', 'cs-bs-alpha'],
          '',
          { value: 5, min: 1, max: 10 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        removeParentBtn(),
      ]
    )
  }
  const transitionBox = createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          createLabel('Transition', '', ['cs-label']),
          createButton('Add', ['inline-btn', 'text-primary'], '', function (e) {
            if (getAllNodes('.cs-trans-name').length > 2) return
            e.target.parentElement.parentElement.appendChild(
              transitionValuesForm()
            )
          }),
        ]
      ),
      transitionValuesForm(),
    ],
    'transition_box'
  )
  function transitionValuesForm() {
    return createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        createInput('', ['cs-text-input', 'cs-trans-name'], '', {
          value: 'opacity',
        }),
        createInput(
          'number',
          ['cs-num-input', 'cs-trans-prd'],
          '',
          { min: 0, value: 3 },
          '',
          () => changeStyle('transition', calTransitionValues())
        ),
        createSelect(
          ['cs-select', 'cs-trans-ef'],
          '',
          [
            { value: 'ease', text: 'Ease' },
            { value: 'linear', text: 'Linear' },
            { value: 'ease-in', text: 'Ease In' },
            { value: 'ease-out', text: 'Ease Out' },
            { value: 'ease-in-out', text: 'Ease In Out' },
            {
              value: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
              text: 'Ease In Quadratic',
            },
            {
              value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              text: 'Ease Out Quadratic',
            },
            {
              value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
              text: 'Ease In-Out Quadratic',
            },
            {
              value: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
              text: 'Ease In Cubic',
            },
            {
              value: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
              text: 'Ease Out Cubic',
            },
          ],
          '',
          () => changeStyle('transition', calTransitionValues())
        ),
        removeParentBtn(),
      ]
    )
  }

  return createForm(
    ['styler-box'],
    [
      createUnitSelector('px', '%', 'em', 'rem', 'vh', 'vw'),
      opacityBox,
      visibilityBox,
      cursorBox,
      backdropFilterBox,
      filterBox,
      boxShadowBox,
      transitionBox,
    ]
  )
}

// display ( inline , none , block , inline-block  )
// display-flex / flex-direction (row , row-reverse ,column , column-reverse )
// justify-content ( center , start ,space-between, space-around , space-evenly )
// align-items ( stretch , center , start , end )
// align-self ( stretch , center , start , end )
// ---- grid ------------- update later ----------- //
function createDisplayForm() {
  const displayBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Display', 'cs_display', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'block', text: 'Block' },
          { value: 'none', text: 'None' },
          { value: 'inline', text: 'Inline' },
          { value: 'inline-block', text: 'Inline-block' },
          { value: 'grid', text: 'Grid' },
          { value: 'flex', text: 'Flex' },
        ],
        'cs_display',
        (e) => changeStyle('display', e.target.value)
      ),
    ]
  )
  const flexBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Flex', 'cs_flex', ['cs-label']),
      createInput('number', ['cs-num-input'], 'cs_flex', '', '', (e) =>
        changeStyle('flex', parseInt(e.target.value))
      ),
    ]
  )
  const flexDirectionBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Flex Direction', 'cs_flex_dir', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'column', text: 'Column' },
          { value: 'column-reverse', text: 'Column Reverse' },
          { value: 'row', text: 'Row' },
          { value: 'row-reverse', text: 'Row Reverse' },
        ],
        'cs_flex_dir',
        (e) => changeStyle('flex-direction', e.target.value)
      ),
    ]
  )
  const flexWrapBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Flex Wrap', 'cs_flex_wrap', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'wrap', text: 'Wrap' },
          { value: 'nowrap', text: 'No Wrap' },
          { value: 'wrap-reverse', text: 'Wrap Reverse' },
        ],
        'cs_flex_wrap',
        (e) => changeStyle('flex-wrap', e.target.value)
      ),
    ]
  )
  const justifyContentBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Justify Content', 'cs_justify_cnt', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'center', text: 'Center' },
          { value: 'start', text: 'Start' },
          { value: 'flex-start', text: 'Flex Start' },
          { value: 'end', text: 'End' },
          { value: 'space-between', text: 'Space Between' },
          { value: 'space-around', text: 'Space Around' },
          { value: 'space-evenly', text: 'Space Evenly' },
        ],
        'cs_justify_cnt',
        (e) => changeStyle('justify-content', e.target.value)
      ),
    ]
  )
  const alignItemsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Align Items', 'cs_algin_items', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'center', text: 'Center' },
          { value: 'stretch', text: 'Stretch' },
          { value: 'start', text: 'Start' },
          { value: 'end', text: 'End' },
          { value: 'flex-start', text: 'Flex Start' },
          { value: 'flex-end', text: 'Flex End' },
          { value: 'self-start', text: 'Self Start' },
          { value: 'self-end', text: 'Self End' },
          { value: 'baseline', text: 'Baseline' },
          { value: 'first baseline', text: 'First Baseline' },
          { value: 'last baseline', text: 'Last Baseline' },
        ],
        'cs_algin_items',
        (e) => changeStyle('align-items', e.target.value)
      ),
    ]
  )
  const alignContentBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Align Content', 'cs_align_cnt', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'center', text: 'Center' },
          { value: 'stretch', text: 'Stretch' },
          { value: 'start', text: 'Start' },
          { value: 'end', text: 'End' },
          { value: 'space-between', text: 'Space Between' },
          { value: 'space-around', text: 'Space Around' },
          { value: 'space-evenly', text: 'Space Evenly' },
          { value: 'flex-start', text: 'Flex Start' },
          { value: 'flex-end', text: 'Flex End' },
          { value: 'baseline', text: 'Baseline' },
          { value: 'first baseline', text: 'First Baseline' },
          { value: 'last baseline', text: 'Last Baseline' },
        ],
        'cs_align_cnt',
        (e) => changeStyle('align-content', e.target.value)
      ),
    ]
  )
  const alignSelfBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Align-self', 'cs_align_self', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'auto', text: 'Auto' },
          { value: 'normal', text: 'Normal' },
          { value: 'start', text: 'Start' },
          { value: 'end', text: 'End' },
          { value: 'flex-start', text: 'Flex Start' },
          { value: 'flex-end', text: 'Flex End' },
          { value: 'self-start', text: 'Self Start' },
          { value: 'self-end', text: 'Self End' },
          { value: 'center', text: 'Center' },
          { value: 'baseline', text: 'Baseline' },
          { value: 'stretch', text: 'Stretch' },
        ],
        'cs_align_self',
        (e) => changeStyle('align-self', e.target.value)
      ),
    ]
  )
  const justifySelfBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Justify-self', 'cs_justify_self', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: 'auto', text: 'Auto' },
          { value: 'normal', text: 'Normal' },
          { value: 'start', text: 'Start' },
          { value: 'end', text: 'End' },
          { value: 'flex-start', text: 'Flex Start' },
          { value: 'flex-end', text: 'Flex End' },
          { value: 'self-start', text: 'Self Start' },
          { value: 'self-end', text: 'Self End' },
          { value: 'center', text: 'Center' },
          { value: 'left', text: 'Left' },
          { value: 'right', text: 'Right' },
          { value: 'baseline', text: 'Baseline' },
          { value: 'stretch', text: 'Stretch' },
        ],
        'cs_justify_self',
        (e) => changeStyle('justify-self', e.target.value)
      ),
    ]
  )
  const readyGridTempColsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-template-columns', 'cs_rdy_grd_temp_cols', [
        'cs-label',
      ]),
      createSelect(
        ['cs-select'],
        '',
        [
          {
            value: 'repeat(3, 1fr)',
            text: 'Three Equal Boxes',
          },
          {
            value: '200px 1fr 2fr',
            text: 'Fixed and Flexible Columns',
          },
          {
            value: '1fr',
            text: 'Responsive Layout (1 Column)',
          },
          {
            value:
              '[sidebar-start] 200px [content-start] 1fr [content-end] 200px [sidebar-end]',
            text: 'Named Areas',
          },
          {
            value: '100px auto 1fr',
            text: 'Fixed, Auto, and Flexible Columns',
          },
          {
            value: 'minmax(100px, 1fr) 2fr 1fr',
            text: 'Responsive Columns with Minmax',
          },
          {
            value: '150px 200px 150px',
            text: 'Multiple Fixed Columns',
          },
        ],
        'cs_rdy_grd_temp_cols',
        (e) => changeStyle('grid-template-columns', e.target.value)
      ),
    ]
  )
  const cusGrdTempColsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Custom grid-template-columns', 'cs_cus_grd_temp_cols', [
        'cs-label',
      ]),
      createInput('', ['cs-text-input'], 'cs_cus_grd_temp_cols', '', '', (e) =>
        changeStyle('grid-template-columns', e.target.value)
      ),
    ]
  )
  const readyGridTempRowsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-template-rows', 'cs_rdy_grd_temp_rows', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          {
            value: 'repeat(3, 1fr)',
            text: 'Three Equal Boxes',
          },
          {
            value: '200px 1fr 2fr',
            text: 'Fixed and Flexible Columns',
          },
          {
            value: '1fr',
            text: 'Responsive Layout (1 Column)',
          },
          {
            value:
              '[sidebar-start] 200px [content-start] 1fr [content-end] 200px [sidebar-end]',
            text: 'Named Areas',
          },
          {
            value: '100px auto 1fr',
            text: 'Fixed, Auto, and Flexible Columns',
          },
          {
            value: 'minmax(100px, 1fr) 2fr 1fr',
            text: 'Responsive Columns with Minmax',
          },
          {
            value: '150px 200px 150px',
            text: 'Multiple Fixed Columns',
          },
        ],
        'cs_rdy_grd_temp_rows',
        (e) => changeStyle('grid-template-rows', e.target.value)
      ),
    ]
  )
  const cusGrdTempRowsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Custom grid-template-rows', 'cs_cus_grd_temp_rows', [
        'cs-label',
      ]),
      createInput('', ['cs-text-input'], 'cs_cus_grd_temp_rows', '', '', (e) =>
        changeStyle('grid-template-rows', e.target.value)
      ),
    ]
  )
  const rdyGrdColsBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Col & Row Set', 'cs_rdy_grd_col_row', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          {
            text: 'Equal Columns and Rows',
            value: 'repeat(3, 1fr) -/- repeat(3, 1fr)',
          },
          {
            text: 'Fixed and Flexible Columns',
            value: '200px 1fr 2fr -/- 1fr',
          },
          {
            text: 'Responsive Layout (1 Column)',
            value: '1fr -/- repeat(2, 1fr)',
          },
          {
            text: 'Responsive Columns with Minmax',
            value: 'minmax(100px, 1fr) 2fr 1fr -/- repeat(3, 1fr)',
          },
          {
            text: 'Named Areas for Columns and Rows',
            value:
              '[sidebar-start] 200px [content-start] 1fr [content-end] 200px [sidebar-end] -/- [header-start] 100px [header-end] 1fr [main-start] 2fr [main-end] 100px [footer-start] 1fr [footer-end]',
          },
          {
            text: 'Auto-fill Columns',
            value: 'repeat(auto-fill, minmax(100px, 1fr)) -/- 1fr',
          },
          {
            text: 'Multiple Fixed Rows',
            value: 'repeat(3, 1fr) -/- 150px 200px 150px',
          },
        ],
        'cs_rdy_grd_col_row',
        (e) =>
          changeSerialStyles(
            ['grid-column', 'grid-row'],
            e.target.value.split('-/-')
          )
      ),
    ]
  )
  const cusGrdColBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Custom grid-column', 'cs_cus_grd_col', ['cs-label']),
      createInput('', ['cs-text-input'], 'cs_cus_grd_col', '', '', (e) =>
        changeStyle('grid-column', e.target.value)
      ),
    ]
  )
  const cusGrdRowBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Custom grid-row', 'cs_cus_grd_row', ['cs-label']),
      createInput('', ['cs-text-input'], 'cs_cus_grd_row', '', '', (e) =>
        changeStyle('grid-row', e.target.value)
      ),
    ]
  )
  const grdColStartBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-col-start', 'cs_grd_col_start', ['cs-label']),

      createInput(
        'number',
        ['cs-num-input'],
        'cs_grd_col_start',
        { value: 2 },
        '',
        (e) =>
          changeStyle(
            'grid-col-start',
            `${getNode('#cs_grd_col_span_start').checked ? 'span ' : ''},${
              e.target.value
            }`
          )
      ),
      createLabel('span !', 'cs_grd_col_span_start', ['cs-label']),
      createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_grd_col_span_start',
        '',
        '',
        (e) =>
          changeStyle(
            'grid-col-start',
            `${e.target.checked ? 'span ' : ''}${parseInt(
              getNode('#cs_grd_col_start').value
            )}`
          )
      ),
    ]
  )
  const grdColEndBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-col-end', 'cs_grd_col_end', ['cs-label']),

      createInput(
        'number',
        ['cs-num-input'],
        'cs_grd_col_end',
        { value: 2 },
        '',
        (e) =>
          changeStyle(
            'grid-col-end',
            `${getNode('#cs_grd_col_span_end').checked ? 'span ' : ''},${
              e.target.value
            }`
          )
      ),
      createLabel('span !', 'cs_grd_col_span_end', ['cs-label']),
      createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_grd_col_span_end',
        '',
        '',
        (e) =>
          changeStyle(
            'grid-col-end',
            `${e.target.checked ? 'span ' : ''}${parseInt(
              getNode('#cs_grd_col_end').value
            )}`
          )
      ),
    ]
  )
  const grdRowStartBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-row-start', 'cs_grd_row_start', ['cs-label']),

      createInput(
        'number',
        ['cs-num-input'],
        'cs_grd_row_start',
        { value: 2 },
        '',
        (e) =>
          changeStyle(
            'grid-row-start',
            `${getNode('#cs_grd_row_span_start').checked ? 'span ' : ''},${
              e.target.value
            }`
          )
      ),
      createLabel('span !', 'cs_grd_row_span_start', ['cs-label']),
      createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_grd_row_span_start',
        '',
        '',
        (e) =>
          changeStyle(
            'grid-row-start',
            `${e.target.checked ? 'span ' : ''}${parseInt(
              getNode('#cs_grd_row_start').value
            )}`
          )
      ),
    ]
  )
  const grdRowEndBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Grid-row-end', 'cs_grd_row_end', ['cs-label']),

      createInput(
        'number',
        ['cs-num-input'],
        'cs_grd_row_end',
        { value: 2 },
        '',
        (e) =>
          changeStyle(
            'grid-row-end',
            `${getNode('#cs_grd_row_span_end').checked ? 'span ' : ''},${
              e.target.value
            }`
          )
      ),
      createLabel('span !', 'cs_grd_row_span_end', ['cs-label']),
      createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_grd_row_span_end',
        '',
        '',
        (e) =>
          changeStyle(
            'grid-row-end',
            `${e.target.checked ? 'span ' : ''}${parseInt(
              getNode('#cs_grd_row_end').value
            )}`
          )
      ),
    ]
  )
  return createForm(
    ['styler-box'],
    [
      displayBox,
      flexBox,
      flexDirectionBox,
      flexWrapBox,
      justifyContentBox,
      alignItemsBox,
      alignContentBox,
      justifySelfBox,
      alignSelfBox,
      readyGridTempColsBox,
      cusGrdTempColsBox,
      readyGridTempRowsBox,
      cusGrdTempRowsBox,
      rdyGrdColsBox,
      cusGrdColBox,
      cusGrdRowBox,
      grdColStartBox,
      grdColEndBox,
      grdRowStartBox,
      grdRowEndBox,
    ]
  )
}

function createAnimationForm() {
  const aniNameBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Name', 'cs_ani_name', ['cs-label']),
      createSelect(['cs-select'], '', [], 'cs_ani_name', function (e) {
        const duration = `${parseInt(getNode('#cs_ani_duration').value) / 10}s`
        const timingFn = getNode('#cs_ani_timing_fn').value
        const delayTime = parseInt(getNode('#cs_ani_delay').value)
        const delay = delayTime === 0 ? '0s' : `${delayTime}s`
        const iterationCount = getNode('#cs_ani_itr_count').value
        const direction = getNode('#cs_ani_direction').value
        const fillNode = getNode('#cs_ani_fill_mode').value
        changeStyle(
          'animation',
          `${e.target.value} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
        )
      }),
    ]
  )
  const aniDurationBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Duration', 'cs_ani_duration', ['cs-label']),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_ani_duration',
        { value: 20 },
        '',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${parseInt(e.target.value) / 10}s`
          const timingFn = getNode('#cs_ani_timing_fn').value
          const delayTime = parseInt(getNode('#cs_ani_delay').value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = getNode('#cs_ani_itr_count').value
          const direction = getNode('#cs_ani_direction').value
          const fillNode = getNode('#cs_ani_fill_mode').value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  const aniTimingFnBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Timing Function', 'cs_ani_timing_fn', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 'ease', text: 'Ease' },
          { value: 'ease-in', text: 'Ease In' },
          { value: 'ease-out', text: 'Ease In Out' },
          { value: 'linear', text: 'Linear' },
          { value: 'step-start', text: 'Step Start' },
          { value: 'step-end', text: 'Step End' },
        ],
        'cs_ani_timing_fn',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${
            parseInt(getNode('#cs_ani_duration').value) / 10
          }s`
          const timingFn = e.target.value
          const delayTime = parseInt(getNode('#cs_ani_delay').value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = getNode('#cs_ani_itr_count').value
          const direction = getNode('#cs_ani_direction').value
          const fillNode = getNode('#cs_ani_fill_mode').value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  const aniDelayBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Delay Time', 'cs_ani_delay', ['cs-label']),
      createInput(
        'number',
        ['cs-num-input'],
        'cs_ani_delay',
        { value: '0' },
        '',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${
            parseInt(getNode('#cs_ani_duration').value) / 10
          }s`
          const timingFn = getNode('#cs_ani_timing_fn').value
          const delayTime = parseInt(e.target.value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = getNode('#cs_ani_itr_count').value
          const direction = getNode('#cs_ani_direction').value
          const fillNode = getNode('#cs_ani_fill_mode').value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  const aniIterationCountBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Iteration Count', 'cs_ani_itr_count', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 5, text: 'Play 5 times' },
          { value: 10, text: 'Play 10 times' },
          { value: 15, text: 'Play 15 times' },
          { value: 'infinite', text: 'Infinite', selected: true },
        ],
        'cs_ani_itr_count',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${
            parseInt(getNode('#cs_ani_duration').value) / 10
          }s`
          const timingFn = getNode('#cs_ani_timing_fn').value
          const delayTime = parseInt(getNode('#cs_ani_delay').value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = e.target.value
          const direction = getNode('#cs_ani_direction').value
          const fillNode = getNode('#cs_ani_fill_mode').value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  const aniDirectionBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Direction', 'cs_ani_direction', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 'reverse', text: 'Reverse' },
          { value: 'alternate', text: 'Alternate' },
          { value: 'alternate-reverse', text: 'Alternate-reverse' },
        ],
        'cs_ani_direction',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${
            parseInt(getNode('#cs_ani_duration').value) / 10
          }s`
          const timingFn = getNode('#cs_ani_timing_fn').value
          const delayTime = parseInt(getNode('#cs_ani_delay').value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = getNode('#cs_ani_itr_count').value
          const direction = e.target.value
          const fillNode = getNode('#cs_ani_fill_mode').value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  const aniFillModeBox = createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      createLabel('Fill Mode', 'cs_ani_fill_mode', ['cs-label']),
      createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 'forwards', text: 'Forwards' },
          { value: 'backwards', text: 'Backwards' },
          { value: 'both', text: 'Both' },
        ],
        'cs_ani_fill_mode',
        function (e) {
          const name = getNode('#cs_ani_name').value
          if (!name) return
          const duration = `${
            parseInt(getNode('#cs_ani_duration').value) / 10
          }s`
          const timingFn = getNode('#cs_ani_timing_fn').value
          const delayTime = parseInt(getNode('#cs_ani_delay').value)
          const delay = delayTime === 0 ? '0s' : `${delayTime}s`
          const iterationCount = getNode('#cs_ani_itr_count').value
          const direction = getNode('#cs_ani_direction').value
          const fillNode = e.target.value
          changeStyle(
            'animation',
            `${name} ${duration} ${timingFn} ${delay} ${iterationCount} ${direction} ${fillNode}`
          )
        }
      ),
    ]
  )
  return createForm(
    ['styler-box'],
    [
      aniNameBox,
      aniDurationBox,
      aniTimingFnBox,
      aniDelayBox,
      aniIterationCountBox,
      aniDirectionBox,
      aniFillModeBox,
    ]
  )
}

function changeStyle(key, value) {
  clearTimeout(spamBlocker)
  spamBlocker = setTimeout(() => {
    changeAppliedStyes(key, value)
  }, 500)
}
function changeSerialStyles(key, value) {
  clearTimeout(spamBlocker)
  spamBlocker = setTimeout(() => {
    key.forEach((one, index) => {
      changeAppliedStyes(one, value[index])
    })
  }, 700)
}

export {
  createSizingForm,
  createPositionForm,
  createTypographyForm,
  createBackgroundForm,
  createBorderAndOutlinesForm,
  createMiscellaneousForm,
  createDisplayForm,
  createAnimationForm,
}
