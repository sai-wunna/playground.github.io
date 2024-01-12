import Document from '../dom/index.js'
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
  calAniTimeLineValue,
  calAnimationValue,
} from './helper/keyValueExtractor.js'

// sizing --------------
// width / max-width / min-width / width-auto / width in px-% /
// height / max-height / min-height / height-auto / height in px-% /
// box-sizing ( border-box, content-box )
// gap
// margin / margin-top / margin-bottom / margin-right / margin-left / margin-auto / margin in px-%-em
// padding / padding-top / padding-bottom / padding-right / padding-left / padding-auto / padding in px-%-em
const _ = Document()
let spamBlocker

const unitSelector = createUnitSelector()

function createSizingForm() {
  const widthBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Width', 'cs_width', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_width', '', '', (e) => {
        changeStyle('width', `${parseInt(e.target.value)}${unitSelector.value}`)
      }),
    ]
  )
  const minWidthBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Min-Width', 'cs_min_width', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_min_width', '', '', (e) =>
        changeStyle(
          'min-width',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const maxWidthBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Max-Width', 'cs_max_width', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_max_width', '', '', (e) =>
        changeStyle(
          'max-width',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const autoWidthBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Width Auto !', 'cs_auto_width', ['cs-label']),
      _.createInput('checkbox', ['cs-checkbox'], 'cs_auto_width', '', '', (e) =>
        changeStyle('width', e.target.checked ? 'auto' : 'inherit')
      ),
    ]
  )
  const heightBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Height', 'cs_height', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_height', '', '', (e) =>
        changeStyle(
          'height',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const minHeightBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Min-Height', 'cs_min_height', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_min_height', '', '', (e) =>
        changeStyle(
          'min-height',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const maxHeightBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Max-Height', 'cs_max_height', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_max_height', '', '', (e) =>
        changeStyle(
          'max-height',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const autoHeightBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Height Auto !', 'cs_auto_height', ['cs-label']),
      _.createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_auto_height',
        '',
        '',
        (e) => changeStyle('height', e.target.checked ? 'auto' : 'inherit')
      ),
    ]
  )
  const boxSizingBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Box sizing', 'cs_bs', ['cs-label']),
      _.createSelect(
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
  // gap
  let cs_gap_x_ip
  let cs_gap_y_ip
  cs_gap_y_ip = _.createInput(
    'number',
    ['cs-num-input'],
    'cs_gap_y',
    '',
    '',
    function (e) {
      const unit = unitSelector.value
      changeStyle(
        'gap',
        `${e.target.value || 0}${unit} ${
          _.getNodeById('cs_gap_x').value || 0
        }${unit}`
      )
    }
  )
  cs_gap_x_ip = _.createInput(
    'number',
    ['cs-num-input'],
    'cs_gap_x',
    '',
    '',
    function (e) {
      const unit = unitSelector.value
      changeStyle(
        'gap',
        `${_.getNodeById('cs_gap_y').value || 0}${unit} ${
          e.target.value || 0
        }${unit}`
      )
    }
  )
  const gapBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [_.createLabel('Gap', '', ['cs-label']), cs_gap_y_ip, cs_gap_x_ip]
  )
  // margin
  const cs_margin_side_s = _.createSelect(
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
  )
  const marginBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Margin', 'cs_margin', ['cs-label']),
      cs_margin_side_s,
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_margin',
        '',
        '',
        function change(e) {
          changeStyle(
            ...calMNPSideValue(
              cs_margin_side_s.value,
              'margin',
              `${e.target.value}${unitSelector.value}`
            )
          )
        }
      ),
    ]
  )
  // padding
  const cs_padding_side_s = _.createSelect(
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
  )
  const paddingBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Padding', 'cs_padding', ['cs-label']),
      cs_padding_side_s,
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_padding',
        '',
        '',
        function (e) {
          changeStyle(
            ...calMNPSideValue(
              cs_padding_side_s.value,
              'padding',
              `${e.target.value}${unitSelector.value}`
            )
          )
        }
      ),
    ]
  )
  // object fit
  const objectFitBox = _.createElement(
    '',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Object-fit', 'cs_obj_fit', ['cs-label']),
      _.createSelect(
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
  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
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
  const positionBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Position', 'cs_position', ['cs-label']),
      _.createSelect(
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
  const floatBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Float', 'cs_float', ['cs-label']),
      _.createSelect(
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
  // top left . . .
  const cs_distance_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'top', text: 'Top' },
      { value: 'right', text: 'Right' },
      { value: 'bottom', text: 'Bottom' },
      { value: 'left', text: 'Left' },
    ],
    'cs_distance_side'
  )
  const distanceBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Distance', 'cs_distance', ['cs-label']),
      cs_distance_s,
      _.createInput('number', ['cs-num-input'], 'cs_distance', '', '', (e) =>
        changeStyle(
          cs_distance_s.value,
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const zIndexBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Z-index', 'cs_zIndex', ['cs-label']),
      _.createInput('number', ['cs-select'], 'cs_zIndex', '', '', (e) =>
        changeStyle('z-index', parseInt(e.target.value))
      ),
    ]
  )
  const zIndexAutoBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Z-index Auto', 'cs_zIndex_auto', ['cs-label']),
      _.createInput(
        'checkbox',
        ['cs-checkbox'],
        'cs_zIndex_auto',
        '',
        '',
        (e) => changeStyle('z-index', e.target.checked ? 'auto' : 1)
      ),
    ]
  )
  // overflow
  const cs_overflow_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'overflow', text: 'Over Flow' },
      { value: 'overflow-y', text: 'Over Flow Y' },
      { value: 'overflow-x', text: 'Over Flow X' },
    ],
    'cs_overflow'
  )
  const overFlowBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Over-Flow', 'cs_overflow', ['cs-label']),
      cs_overflow_s,
      _.createSelect(
        ['cs-select'],
        '',
        [
          { value: 'auto', text: 'Auto' },
          { value: 'scroll', text: 'Scrollable' },
          { value: 'hidden', text: 'Hide' },
          { value: 'visible', text: 'Visible' },
        ],
        'cs_overflow_style',
        (e) => changeStyle(cs_overflow_s.value, e.target.value)
      ),
    ]
  )
  // transform
  let transformList = ['translate']
  const transformBox = _.createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Transform', '', ['cs-label']),
          _.createSelect(
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
          _.createButton(
            'Add',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              const key = _.getNodeById('cs_transform_type').value
              if (transformList.findIndex((one) => one === key) !== -1) return
              transformList.push(key)
              e.target.parentElement.parentElement.appendChild(
                transformListForm(key)
              )
            }
          ),
          _.createButton(
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
      return _.createButton('Del', ['inline-btn', 'text-danger'], '', (e) => {
        e.preventDefault()
        e.target.parentElement.remove()
        transformList = transformList.filter((one) => one !== key)
      })
    }
    if (type === 'translate') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Translate', '', ['cs-label']),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate-value'],
            '',
            { value: '-50' }
          ),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate-value'],
            '',
            { value: '-50' }
          ),
          removeBtn('translate'),
        ]
      )
    } else if (type === 'rotate') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Rotate', '', ['cs-label']),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate-value'],
            '',
            {
              value: 15,
            }
          ),
          removeBtn('rotate'),
        ]
      )
    } else if (type === 'scale') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Scale', '', ['cs-label']),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-scale-value'],
            '',
            {
              value: 1.1,
            }
          ),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-scale-value'],
            '',
            {
              value: 1.1,
            }
          ),
          removeBtn('scale'),
        ]
      )
    } else if (type === 'skew') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Skew', '', ['cs-label']),
          _.createInput('number', ['cs-num-input', 'cs-trans-skew-value'], '', {
            value: 45,
          }),
          _.createInput('number', ['cs-num-input', 'cs-trans-skew-value'], '', {
            value: 45,
          }),
          removeBtn('skew'),
        ]
      )
    } else if (type === 'perspective') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Perspective', '', ['cs-label']),
          _.createInput('number', ['cs-num-input', 'cs-trans-pov-value'], '', {
            value: 1000,
          }),
          removeBtn('perspective'),
        ]
      )
    } else if (type === 'rotate3d') {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Rotate 3D', '', ['cs-label']),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 10 }
          ),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 30 }
          ),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-rotate3d-value'],
            '',
            { value: 50 }
          ),
          removeBtn('rotate3d'),
        ]
      )
    } else {
      return _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Translate 3D', '', ['cs-label']),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate3d-value'],
            '',
            { value: 10 }
          ),
          _.createInput(
            'number',
            ['cs-num-input', 'cs-trans-translate3d-value'],
            '',
            { value: 30 }
          ),
          _.createInput(
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
  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
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
  const fontSizeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Font-size', 'cs_font_size', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_font_size', '', '', (e) =>
        changeStyle('font-size', `${e.target.value}${unitSelector.value}`)
      ),
    ]
  )
  const fontFamilyBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Font-family', 'cs_font_family', ['cs-label']),
      _.createSelect(
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
  const fontStyleBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Font-style', 'cs_font_style', ['cs-label']),
      _.createSelect(
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
  const fontWeightBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Font-weight', 'cs_font_weight', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_font_weight', '', '', (e) =>
        changeStyle('font-weight', parseInt(e.target.value))
      ),
    ]
  )
  const lineHeightBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Line-height', 'cs_line_height', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_line_height', '', '', (e) =>
        changeStyle(
          'line-height',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const letterSpacingBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Letter Spacing', 'cs_letter_spacing', ['cs-label']),
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_letter_spacing',
        '',
        '',
        (e) =>
          changeStyle(
            'letter-spacing',
            `${parseInt(e.target.value)}${unitSelector.value}`
          )
      ),
    ]
  )
  const colorBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Color', 'cs_color', ['cs-label']),
      _.createInput(
        'color',
        ['cs-color-input'],
        'cs_color',
        { value: '#000000' },
        '',
        (e) => changeStyle('color', e.target.value)
      ),
    ]
  )
  const textDecoBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Text Decoration', 'cs_text_deco', ['cs-label']),
      _.createSelect(
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
  // text decoration
  let cs_text_ul_color_ip
  let cs_text_ul_type_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'dotted', text: 'Dotted' },
      { value: 'wavy', text: 'Wavy' },
    ],
    'cs_underline_type',
    function (e) {
      changeStyle(
        'text-decoration',
        calTextDecoration(e.target.value, cs_text_ul_color_ip.value)
      )
    }
  )
  const decoTypeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Text Decoration Types', 'cs_underline_type', ['cs-label']),
      cs_text_ul_type_s,
    ]
  )
  cs_text_ul_color_ip = _.createInput(
    'color',
    ['cs-color-input'],
    'cs_underline_color',
    { value: '#000000' },
    '',
    function (e) {
      changeStyle(
        'text-decoration',
        calTextDecoration(cs_text_ul_type_s.value, e.target.value)
      )
    }
  )
  const decoColorBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Text Decoration Color', 'cs_underline_color', [
        'cs-label',
      ]),
      cs_text_ul_color_ip,
    ]
  )
  // align
  const textAlignBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Text align', 'cs_text_align', ['cs-label']),
      _.createSelect(
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
  const textIndentBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Text Indent', 'cs_text_idt', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_text_idt', '', '', (e) =>
        changeStyle('text-indent', `${e.target.value}${unitSelector.value}`)
      ),
    ]
  )
  const writingModeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Writing Mode', 'cs_writing_mode', ['cs-label']),
      _.createSelect(
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
  const textShadowBox = _.createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Text-Shadow', '', ['cs-label']),
          _.createButton('Add', ['inline-btn'], '', function (e) {
            e.preventDefault()
            if (_.getAllNodes('.cs-ts-xo').length > 2) return
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
    return _.createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        _.createInput(
          'number',
          ['cs-num-input', 'cs-ts-xo'],
          '',
          { value: 2 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-ts-yo'],
          '',
          { value: 2 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-ts-blur'],
          '',
          { value: 5 },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        _.createInput(
          'color',
          ['cs-color-input', 'cs-ts-color'],
          '',
          { value: '#000000' },
          '',
          () => changeStyle('text-shadow', calTextShadowValue())
        ),
        _.createInput(
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
  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
      fontSizeBox,
      fontFamilyBox,
      fontStyleBox,
      fontWeightBox,
      letterSpacingBox,
      lineHeightBox,
      colorBox,
      textDecoBox,
      decoTypeBox,
      decoColorBox,
      textAlignBox,
      textIndentBox,
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
  let cs_bg_color_ip
  let cs_opacity_ip
  cs_bg_color_ip = _.createInput(
    'color',
    ['cs-color-input'],
    'cs_background',
    { value: '#000000' },
    '',
    function (e) {
      let opacity = Math.min(Math.max(parseInt(cs_opacity_ip.value), 1), 10)
      changeStyle(
        'background-color',
        `rgba(${hexToRgb(e.target.value)},${opacity / 10})`
      )
    }
  )
  cs_opacity_ip = _.createInput(
    'number',
    ['cs-num-input'],
    'cs_bg_opacity',
    { value: 10 },
    '',
    function (e) {
      let opacity = Math.min(Math.max(parseInt(e.target.value), 1), 10)
      changeStyle(
        'background-color',
        `rgba(${hexToRgb(cs_bg_color_ip.value)},${opacity / 10})`
      )
    }
  )
  const bgBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Background', 'cs_background', ['cs-label']),
      cs_bg_color_ip,
      cs_opacity_ip,
    ]
  )
  // gradient
  const cs_bg_type_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'linear', text: 'Liner Gradient' },
      { value: 'radial', text: 'Radial Gradient' },
    ],
    'cs_bg_type'
  )
  const cs_bg_gradient_deg_ip = _.createInput(
    'number',
    ['cs-num-input'],
    'cs_grd_deg',
    {
      value: 45,
      min: 0,
      max: 360,
    },
    '',
    (e) =>
      changeStyle(
        'background',
        calGrdValue(
          _.getNodeById('cs_bg_type').value,
          _.getAllNodes('.bg-grd-color'),
          _.getNodeById('cs_grd_deg').value
        )
      )
  )
  function createGrdColorIp() {
    return _.createInput(
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
            _.getNodeById('cs_bg_type').value,
            _.getAllNodes('.bg-grd-color'),
            _.getNodeById('cs_grd_deg').value
          )
        )
    )
  }
  const bgGradientBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Gradient', 'cs_bg_type', ['cs-label']),
      cs_bg_type_s,
      cs_bg_gradient_deg_ip,
      createGrdColorIp(),
      createGrdColorIp(),
      createGrdColorIp(),
    ]
  )
  // bg image
  const bgImgBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Image', 'cs_bg_img', ['cs-label']),
      _.createInput(
        '',
        ['cs-text-input'],
        'cs_bg_img',
        { placeholder: 'use link only' },
        '',
        (e) => changeStyle('background-image', `url(${e.target.value})`)
      ),
    ]
  )
  const bgSizeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Size', 'cs_bg_size', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_bg_size', '', '', (e) =>
        changeStyle(
          'background-size',
          `${parseInt(e.target.value)}${unitSelector.value}`
        )
      ),
    ]
  )
  const bgSizeAutoBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Size ( predefined )', 'cs_bg_size_pre', [
        'cs-label',
      ]),
      _.createSelect(
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
  const bgRepeatBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Repeat', 'cs_bg_rp', ['cs-label']),
      _.createSelect(
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
  const bgPositionBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Position', 'cs_bg_pst', ['cs-label']),
      _.createSelect(
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
  const bgClipBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Clip', 'cs_bg_clip', ['cs-label']),
      _.createSelect(
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
  const bgAttachmentBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Background Attachment', 'cs_bg_attach', ['cs-label']),
      _.createSelect(
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

  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
      bgBox,
      bgGradientBox,
      bgImgBox,
      bgSizeBox,
      bgSizeAutoBox,
      bgClipBox,
      bgAttachmentBox,
      bgPositionBox,
      bgRepeatBox,
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
  let cs_boo_type_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'border', text: 'Border' },
      { value: 'outline', text: 'Outline' },
    ],
    'cs_bOOChooser',
    (e) =>
      (_.getNodeById('bOOChooser').textContent = e.target.value.toUpperCase())
  )
  let cs_boo_color_ip
  let cs_boo_style_s
  let cs_boo_width_ip
  let cs_boo_side_s

  const bOOBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('BORDER', 'cs_bOOChooser', ['cs-label'], 'bOOChooser'),
      cs_boo_type_s,
    ]
  )
  cs_boo_width_ip = _.createInput(
    'number',
    ['cs-num-input'],
    'cs_boo_width',
    { value: 2 },
    '',
    function (e) {
      const [key, value] = manageBOO(
        cs_boo_type_s.value,
        cs_boo_side_s.value,
        cs_boo_style_s.value,
        `${parseInt(e.target.value)}${unitSelector.value}`,
        cs_boo_color_ip.value
      )
      changeStyle(key, value)
    }
  )
  const bOOWidthBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [_.createLabel('Width', 'cs_boo_width', ['cs-label']), cs_boo_width_ip]
  )
  cs_boo_style_s = _.createSelect(
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
        cs_boo_type_s.value,
        cs_boo_side_s.value,
        e.target.value,
        `${parseInt(cs_boo_width_ip.value)}${unitSelector.value}`,
        cs_boo_color_ip.value
      )
      changeStyle(key, value)
    }
  )
  const bOOTypeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [_.createLabel('Style', 'cs_boo_type', ['cs-label']), cs_boo_style_s]
  )
  cs_boo_color_ip = _.createInput(
    'color',
    ['cs-color-input'],
    'cs_boo_color',
    { value: '#000000' },
    '',
    function (e) {
      const [key, value] = manageBOO(
        cs_boo_type_s.value,
        cs_boo_side_s.value,
        cs_boo_style_s.value,
        `${parseInt(cs_boo_width_ip.value)}${unitSelector.value}`,
        e.target.value
      )
      changeStyle(key, value)
    }
  )
  const bOOColorBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [_.createLabel('Color', 'cs_boo_color', ['cs-label']), cs_boo_color_ip]
  )
  cs_boo_side_s = _.createSelect(
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
  )
  const bOOSideBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [_.createLabel('Side', 'cs_boo_side', ['cs-label']), cs_boo_side_s]
  )
  // remove boo
  const rmBorderBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Remove border', 'cs_rm_border', ['cs-label']),
      _.createInput('checkbox', ['cs-checkbox'], 'cs_rm_border', '', '', (e) =>
        changeStyle('border', e.target.checked ? 'none' : '2px solid')
      ),
    ]
  )
  const rmOutlineBox = _.createElement(
    'div',
    '',
    ['cs-cb-gp'],
    [
      _.createLabel('Remove outline', 'cs_rm_outline', ['cs-label']),
      _.createInput('checkbox', ['cs-checkbox'], 'cs_rm_outline', '', '', (e) =>
        changeStyle('outline', e.target.checked ? 'none' : '2px solid')
      ),
    ]
  )
  // radius
  let cs_border_radius_1_ip
  let cs_border_radius_2_ip
  let cs_border_radius_3_ip
  let cs_border_radius_4_ip
  function createBRIp() {
    return _.createInput('number', ['cs-num-input'], '', '', '', function () {
      const unit = unitSelector.value
      const one = `${cs_border_radius_1_ip.value}${unit}`
      const two = `${cs_border_radius_2_ip.value}${unit}`
      const three = `${cs_border_radius_3_ip.value}${unit}`
      const four = `${cs_border_radius_4_ip.value}${unit}`
      changeStyle('border-radius', `${one} ${two} ${three} ${four}`)
    })
  }
  cs_border_radius_1_ip = createBRIp()
  cs_border_radius_2_ip = createBRIp()
  cs_border_radius_3_ip = createBRIp()
  cs_border_radius_4_ip = createBRIp()
  const borderRadiusBox = _.createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      _.createLabel('Border Radius', '', ['cs-label']),
      _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          cs_border_radius_1_ip,
          cs_border_radius_2_ip,
          cs_border_radius_3_ip,
          cs_border_radius_4_ip,
        ]
      ),
    ]
  )
  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
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
  const opacityBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Opacity 0 - 10', 'cs_opacity', ['cs-label']),
      _.createInput(
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
  const visibilityBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Visibility', 'cs_visibility', ['cs-label']),
      _.createSelect(
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
  const cursorBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Cursor', 'cs_cursor', ['cs-label']),
      _.createSelect(
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
  // backdrop
  const cs_bd_filter_type_s = _.createSelect(
    ['cs-select'],
    '',
    [
      { value: 'blur', text: 'Blur' },
      { value: 'invert', text: 'Invert' },
      { value: 'sepia', text: 'Sepia' },
    ],
    'cs_bd_filter_tp'
  )
  const backdropFilterBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Backdrop Filter', 'cs_bd_filter', ['cs-label']),
      cs_bd_filter_type_s,
      _.createInput('number', ['cs-num-input'], 'cs_bd_filter', '', '', (e) =>
        changeStyle(
          'backdrop-filter',
          `${cs_bd_filter_tp.value}(${parseInt(e.target.value)}${
            unitSelector.value
          })`
        )
      ),
    ]
  )
  // filter
  const cs_filter_tp = _.createSelect(
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
  )
  const filterBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Filter', 'cs_filter', ['cs-label']),
      cs_filter_tp,
      _.createInput('number', ['cs-num-input'], 'cs_filter', '', '', (e) =>
        changeStyle(
          'filter',
          `${cs_filter_tp.value}(${parseInt(e.target.value)}${
            unitSelector.value
          })`
        )
      ),
    ]
  )
  const boxShadowBox = _.createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Box-Shadow', '', ['cs-label']),
          _.createButton(
            'Add',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              if (_.getAllNodes('.cs-bs-type').length > 2) return
              e.target.parentElement.parentElement.appendChild(
                boxShadowValueForm()
              )
            }
          ),
        ]
      ),
      _.createElement('div', '', ['cs-ip-gp']),
      boxShadowValueForm(),
    ]
  )
  function boxShadowValueForm() {
    return _.createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        _.createSelect(['cs-select', 'cs-bs-type'], '', [
          { value: '', text: 'Out' },
          { value: 'inset', text: 'Inset' },
        ]),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-bs-xo'],
          '',
          { value: 5 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-bs-yo'],
          '',
          { value: 5 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-bs-blur'],
          '',
          { value: 2 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-bs-spr'],
          '',
          { value: 2 },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        _.createInput(
          'color',
          ['cs-color-input', 'cs-bs-color'],
          '',
          { value: '#000000' },
          '',
          () => changeStyle('box-shadow', calBoxShadowValue())
        ),
        _.createInput(
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
  // transition
  const transitionBox = _.createElement(
    'div',
    '',
    ['cs-lg-gp'],
    [
      _.createElement(
        'div',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Transition', '', ['cs-label']),
          _.createButton(
            'Add',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              if (_.getAllNodes('.cs-trans-name').length > 2) return
              e.target.parentElement.parentElement.appendChild(
                transitionValuesForm()
              )
            }
          ),
        ]
      ),
      transitionValuesForm(),
    ],
    'transition_box'
  )
  function transitionValuesForm() {
    return _.createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        _.createInput('', ['cs-text-input', 'cs-trans-name'], '', {
          value: 'opacity',
        }),
        _.createInput(
          'number',
          ['cs-num-input', 'cs-trans-prd'],
          '',
          { min: 0, value: 3 },
          '',
          () =>
            changeStyle(
              'transition',
              calTransitionValues(
                _.getAllNodes('.cs-trans-prd'),
                _.getAllNodes('.cs-trans-ef')
              )
            )
        ),
        _.createSelect(
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
          () =>
            changeStyle(
              'transition',
              calTransitionValues(
                _.getAllNodes('.cs-trans-prd'),
                _.getAllNodes('.cs-trans-ef')
              )
            )
        ),
        removeParentBtn(),
      ]
    )
  }

  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
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

// ---- grid ------------- need to make familiar update----------- //
function createDisplayForm() {
  const displayBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Display', 'cs_display', ['cs-label']),
      _.createSelect(
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
  const flexBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Flex', 'cs_flex', ['cs-label']),
      _.createInput('number', ['cs-num-input'], 'cs_flex', '', '', (e) =>
        changeStyle('flex', parseInt(e.target.value))
      ),
    ]
  )
  const flexDirectionBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Flex Direction', 'cs_flex_dir', ['cs-label']),
      _.createSelect(
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
  const flexWrapBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Flex Wrap', 'cs_flex_wrap', ['cs-label']),
      _.createSelect(
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
  const justifyContentBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Justify Content', 'cs_justify_cnt', ['cs-label']),
      _.createSelect(
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
  const alignItemsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Align Items', 'cs_algin_items', ['cs-label']),
      _.createSelect(
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
  const alignContentBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Align Content', 'cs_align_cnt', ['cs-label']),
      _.createSelect(
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
  const alignSelfBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Align-self', 'cs_align_self', ['cs-label']),
      _.createSelect(
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
  const justifySelfBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Justify-self', 'cs_justify_self', ['cs-label']),
      _.createSelect(
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
  const readyGridTempColsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Grid-template-columns', 'cs_rdy_grd_temp_cols', [
        'cs-label',
      ]),
      _.createSelect(
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
  const cusGridTempColsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Custom grid-template-columns', 'cs_cus_grd_temp_cols', [
        'cs-label',
      ]),
      _.createInput(
        '',
        ['cs-text-input'],
        'cs_cus_grd_temp_cols',
        '',
        '',
        (e) => changeStyle('grid-template-columns', e.target.value)
      ),
    ]
  )
  const readyGridTempRowsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Grid-template-rows', 'cs_rdy_grd_temp_rows', ['cs-label']),
      _.createSelect(
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
  const cusGridTempRowsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Custom grid-template-rows', 'cs_cus_grd_temp_rows', [
        'cs-label',
      ]),
      _.createInput(
        '',
        ['cs-text-input'],
        'cs_cus_grd_temp_rows',
        '',
        '',
        (e) => changeStyle('grid-template-rows', e.target.value)
      ),
    ]
  )
  const readyGridColsBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Col & Row Set', 'cs_rdy_grd_col_row', ['cs-label']),
      _.createSelect(
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
  const cusGridColBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Custom grid-column', 'cs_cus_grd_col', ['cs-label']),
      _.createInput('', ['cs-text-input'], 'cs_cus_grd_col', '', '', (e) =>
        changeStyle('grid-column', e.target.value)
      ),
    ]
  )
  const cusGridRowBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Custom grid-row', 'cs_cus_grd_row', ['cs-label']),
      _.createInput('', ['cs-text-input'], 'cs_cus_grd_row', '', '', (e) =>
        changeStyle('grid-row', e.target.value)
      ),
    ]
  )
  // grid column start
  let cs_grid_col_or_row_ip
  let cs_grid_col_or_row_c
  const cs_grid_col_or_row_s = _.createSelect(['cs-select'], '', [
    { value: 'gid-column-start', text: 'Grid-col-start' },
    { value: 'gid-column-end', text: 'Grid-col-end' },
    { value: 'gid-row-start', text: 'Grid-row-start' },
    { value: 'gid-row-end', text: 'Grid-row-end' },
  ])
  cs_grid_col_or_row_ip = _.createInput(
    'number',
    ['cs-num-input'],
    '',
    { value: 2 },
    '',
    (e) =>
      changeStyle(
        cs_grid_col_or_row_s.value,
        `${cs_grid_col_or_row_c.checked ? 'span ' : ''}${e.target.value}`
      )
  )
  cs_grid_col_or_row_c = _.createInput(
    'checkbox',
    ['cs-checkbox'],
    'cs_grd_span',
    '',
    '',
    (e) =>
      changeStyle(
        cs_grid_col_or_row_s.value,
        `${e.target.checked ? 'span ' : ''}${parseInt(
          cs_grid_col_or_row_ip.value
        )}`
      )
  )
  const grdColOrRowBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      cs_grid_col_or_row_s,
      cs_grid_col_or_row_ip,
      cs_grid_col_or_row_c,
      _.createLabel('span', 'cs_grd_span', ['cs-label']),
    ]
  )
  return _.createElement(
    '',
    '',
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
      cusGridTempColsBox,
      readyGridTempRowsBox,
      cusGridTempRowsBox,
      readyGridColsBox,
      cusGridColBox,
      cusGridRowBox,
      grdColOrRowBox,
    ]
  )
}

function createAnimationForm() {
  const aniNameBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Name', 'cs_ani_name', ['cs-label']),
      _.createSelect(['cs-select'], '', [], 'cs_ani_name', function () {
        const name = _.getNodeById('cs_ani_name').value
        if (!name) return
        const value = calAnimationValue()
        if (!value) return
        changeStyle('animation', `${name} ${value}`)
      }),
    ]
  )
  const aniDurationBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Duration', 'cs_ani_duration', ['cs-label']),
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_ani_duration',
        { value: 20 },
        '',
        function () {
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniTimingFnBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Timing Function', 'cs_ani_timing_fn', ['cs-label']),
      _.createSelect(
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
        function () {
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniDelayBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Delay Time', 'cs_ani_delay', ['cs-label']),
      _.createInput(
        'number',
        ['cs-num-input'],
        'cs_ani_delay',
        { value: '0' },
        '',
        function () {
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniIterationCountBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Iteration Count', 'cs_ani_itr_count', ['cs-label']),
      _.createSelect(
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
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniDirectionBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Direction', 'cs_ani_direction', ['cs-label']),
      _.createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 'reverse', text: 'Reverse' },
          { value: 'alternate', text: 'Alternate' },
          { value: 'alternate-reverse', text: 'Alternate-reverse' },
        ],
        'cs_ani_direction',
        function () {
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniFillModeBox = _.createElement(
    'div',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Fill Mode', 'cs_ani_fill_mode', ['cs-label']),
      _.createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'None' },
          { value: 'forwards', text: 'Forwards' },
          { value: 'backwards', text: 'Backwards' },
          { value: 'both', text: 'Both' },
        ],
        'cs_ani_fill_mode',
        function () {
          const name = _.getNodeById('cs_ani_name').value
          if (!name) return
          const value = calAnimationValue()
          if (!value) return
          changeStyle('animation', `${name} ${value}`)
        }
      ),
    ]
  )
  const aniTimeLineScrollBox = _.createElement(
    '',
    '',
    ['cs-ip-gp'],
    [
      _.createLabel('Timeline Scroll', 'cs_ani_timeLine_scroll', ['cs-label']),
      _.createSelect(
        ['cs-select'],
        '',
        [
          { value: '', text: 'Empty' },
          { value: 'nearest', text: 'Nearest' },
          { value: 'root', text: 'Root' },
          { value: 'self', text: 'Self' },
          { value: 'block', text: 'Block' },
          { value: 'block nearest', text: 'Block Nearest' },
          { value: 'x', text: 'X axis' },
          { value: 'y', text: 'Y axis' },
          { value: 'inline', text: 'Inline' },
          { value: 'inline root', text: 'Inline Root' },
          { value: 'x self', text: 'X Self' },
        ],
        'cs_ani_timeLine_scroll',
        (e) => changeStyle('animation-timeline', `scroll(${e.target.value})`)
      ),
    ]
  )

  const aniTimelineViewBox = _.createElement(
    '',
    '',
    ['cs-lg-gp'],
    [
      _.createElement(
        '',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Timeline View', 'cs_ani_timeline_view', ['cs-label']),
          _.createSelect(
            ['cs-select'],
            '',
            [
              { value: '', text: 'Empty' },
              { value: 'block', text: 'Block' },
              { value: 'inline', text: 'Inline' },
              { value: 'y', text: 'Y axis' },
              { value: 'x', text: 'X axis' },
              { value: 'block auto', text: 'Block Auto' },
              { value: 'auto', text: 'Auto' },
              { value: 'block', text: 'Block' },
              { value: 'v_single_inset', text: 'Custom Single Inset' },
              { value: 'v_double_inset', text: 'Custom Double Inset' },
              {
                value: 'v_block_double_inset',
                text: 'Block Custom Double Inset',
              },
              { value: 'v_x_custom_auto', text: 'X Custom Auto' },
              { value: 'v_inline_custom', text: 'Inline Custom-inset' },
              { value: 'v_auto_custom', text: 'Auto Custom-inset' },
            ],
            'cs_ani_timeline_view'
          ),
          _.createButton(
            'Set',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              changeStyle('animation-timeline', calAniTimeLineValue())
            }
          ),
        ]
      ),
      _.createElement(
        '',
        '',
        ['cs-ip-gp'],
        [
          _.createLabel('Cus-1', '', ['cs-label']),
          _.createInput('number', ['cs-num-input', 'ani-tl-view-arg-value']),
          _.createLabel('Cus-2', '', ['cs-label']),
          _.createInput('number', ['cs-num-input', 'ani-tl-view-arg-value']),
        ]
      ),
    ]
  )

  return _.createElement(
    '',
    '',
    ['styler-box'],
    [
      aniNameBox,
      aniDurationBox,
      aniTimingFnBox,
      aniDelayBox,
      aniIterationCountBox,
      aniDirectionBox,
      aniFillModeBox,
      aniTimeLineScrollBox,
      aniTimelineViewBox,
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
  }, 500)
}

export {
  unitSelector,
  createUnitSelector,
  createSizingForm,
  createPositionForm,
  createTypographyForm,
  createBackgroundForm,
  createBorderAndOutlinesForm,
  createMiscellaneousForm,
  createDisplayForm,
  createAnimationForm,
}
