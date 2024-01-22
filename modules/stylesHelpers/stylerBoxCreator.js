'use strict'
import {
  unitFour,
  unitOne,
  unitSelectors,
  unitThree,
  unitTwo,
  removeParentBtn,
} from './helper/creator.js'
import KeyValueExtractor from './helper/keyValueExtractor.js'

class StylerBoxCreator {
  #changeAppliedStyes
  #_
  #calStylesData
  constructor(doc, changeAppliedStyes) {
    this.#_ = doc
    this.#changeAppliedStyes = changeAppliedStyes.bind(this)
    this.#calStylesData = new KeyValueExtractor(
      doc,
      unitOne,
      unitTwo,
      unitThree,
      unitFour
    )
  }

  #spamBlocker

  // sizing --------------
  // width / max-width / min-width / width-auto / width in px-% /
  // height / max-height / min-height / height-auto / height in px-% /
  // box-sizing ( border-box, content-box )
  // gap
  // margin / margin-top / margin-bottom / margin-right / margin-left / margin-auto / margin in px-%-em
  // padding / padding-top / padding-bottom / padding-right / padding-left / padding-auto / padding in px-%-em

  createSizingForm() {
    const widthBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Width', 'cs_width', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_width',
          '',
          '',
          (e) => {
            this.#changeStyle(
              'width',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
          }
        ),
      ]
    )
    const minWidthBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Min-Width', 'cs_min_width', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_min_width',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'min-width',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const maxWidthBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Max-Width', 'cs_max_width', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_max_width',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'max-width',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const autoWidthBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Width Auto !', 'cs_auto_width', ['cs-label']),
        this.#_.createInput(
          'checkbox',
          ['cs-checkbox'],
          'cs_auto_width',
          '',
          '',
          (e) =>
            this.#changeStyle('width', e.target.checked ? 'auto' : 'inherit')
        ),
      ]
    )
    const heightBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Height', 'cs_height', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_height',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'height',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const minHeightBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Min-Height', 'cs_min_height', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_min_height',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'min-height',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const maxHeightBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Max-Height', 'cs_max_height', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_max_height',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'max-height',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const autoHeightBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Height Auto !', 'cs_auto_height', ['cs-label']),
        this.#_.createInput(
          'checkbox',
          ['cs-checkbox'],
          'cs_auto_height',
          '',
          '',
          (e) =>
            this.#changeStyle('height', e.target.checked ? 'auto' : 'inherit')
        ),
      ]
    )
    const boxSizingBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Box sizing', 'cs_bs', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'border-box', text: 'border-box' },
            { value: 'content-box', text: 'content-box' },
          ],
          'cs_bs',
          (e) => this.#changeStyle('box-sizing', e.target.value)
        ),
      ]
    )
    // gap
    let cs_gap_x_ip
    let cs_gap_y_ip
    cs_gap_y_ip = this.#_.createInput(
      'number',
      ['cs-num-input'],
      'cs_gap_y',
      '',
      '',
      (e) => {
        const unit = unitOne.value
        this.#changeStyle(
          'gap',
          this.#calStylesData.calGapValue(e.target.value, cs_gap_x_ip.value)
        )
      }
    )
    cs_gap_x_ip = this.#_.createInput(
      'number',
      ['cs-num-input'],
      'cs_gap_x',
      '',
      '',
      (e) => {
        this.#changeStyle(
          'gap',
          this.#calStylesData.calGapValue(cs_gap_y_ip.value, e.target.value)
        )
      }
    )
    const gapBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [this.#_.createLabel('Gap', '', ['cs-label']), cs_gap_y_ip, cs_gap_x_ip]
    )
    // margin
    const cs_margin_side_s = this.#_.createSelect(
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
    const marginBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Margin', 'cs_margin', ['cs-label']),
        cs_margin_side_s,
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_margin',
          '',
          '',
          (e) => {
            this.#changeStyle(
              ...this.#calStylesData.calMarginValue(
                cs_margin_side_s.value,
                `${e.target.value}${unitOne.value}`
              )
            )
          }
        ),
      ]
    )
    // padding
    const cs_padding_side_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: '', text: 'All side' },
        { value: 'top', text: 'top' },
        { value: 'right', text: 'right' },
        { value: 'bottom', text: 'bottom' },
        { value: 'left', text: 'left' },
        { value: '0-x', text: '0 x-axis' },
        { value: 'y-0', text: 'y-axis 0' },
      ],
      'cs_padding_side'
    )
    const paddingBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Padding', 'cs_padding', ['cs-label']),
        cs_padding_side_s,
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_padding',
          '',
          '',
          (e) => {
            this.#changeStyle(
              ...this.#calStylesData.calPaddingValue(
                cs_padding_side_s.value,
                `${e.target.value}${unitOne.value}`
              )
            )
          }
        ),
      ]
    )
    // object fit
    const objectFitBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Object-fit', 'cs_obj_fit', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('object-fit', e.target.value)
        ),
      ]
    )
    return this.#_.createElement(
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

  createPositionForm() {
    const positionBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Position', 'cs_position', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('position', e.target.value)
        ),
      ]
    )
    const floatBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Float', 'cs_float', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('float', e.target.value)
        ),
      ]
    )
    // top left . . .
    const cs_distance_s = this.#_.createSelect(
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
    const distanceBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Distance', 'cs_distance', ['cs-label']),
        cs_distance_s,
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_distance',
          '',
          '',
          (e) =>
            this.#changeStyle(
              cs_distance_s.value,
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const zIndexBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Z-index', 'cs_zIndex', ['cs-label']),
        this.#_.createInput('number', ['cs-select'], 'cs_zIndex', '', '', (e) =>
          this.#changeStyle('z-index', parseInt(e.target.value))
        ),
      ]
    )
    const zIndexAutoBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Z-index Auto', 'cs_zIndex_auto', ['cs-label']),
        this.#_.createInput(
          'checkbox',
          ['cs-checkbox'],
          'cs_zIndex_auto',
          '',
          '',
          (e) => this.#changeStyle('z-index', e.target.checked ? 'auto' : 1)
        ),
      ]
    )
    // overflow
    const cs_overflow_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: 'overflow', text: 'Over Flow' },
        { value: 'overflow-y', text: 'Over Flow Y' },
        { value: 'overflow-x', text: 'Over Flow X' },
      ],
      'cs_overflow'
    )
    const overFlowBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Over-Flow', 'cs_overflow', ['cs-label']),
        cs_overflow_s,
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'auto', text: 'Auto' },
            { value: 'scroll', text: 'Scrollable' },
            { value: 'hidden', text: 'Hide' },
            { value: 'visible', text: 'Visible' },
          ],
          'cs_overflow_style',
          (e) => this.#changeStyle(cs_overflow_s.value, e.target.value)
        ),
      ]
    )
    // transform
    const transformListForm = (type) => {
      const removeBtn = (key) => {
        return this.#_.createButton(
          'Del',
          ['inline-btn', 'text-danger'],
          '',
          (e) => {
            e.preventDefault()
            e.target.parentElement.remove()
            transformList = transformList.filter((one) => one !== key)
          }
        )
      }
      if (type === 'translate') {
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Translate', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-translate-value'],
              '',
              { value: '-50' }
            ),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-translate-value'],
              '',
              { value: '-50' }
            ),
            removeBtn('translate'),
          ]
        )
      } else if (type === 'rotate') {
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Rotate', '', ['cs-label']),
            this.#_.createInput(
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
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Scale', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-scale-value'],
              '',
              {
                value: 1.1,
              }
            ),
            this.#_.createInput(
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
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Skew', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-skew-value'],
              '',
              {
                value: 45,
              }
            ),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-skew-value'],
              '',
              {
                value: 45,
              }
            ),
            removeBtn('skew'),
          ]
        )
      } else if (type === 'perspective') {
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Perspective', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-pov-value'],
              '',
              {
                value: 1000,
              }
            ),
            removeBtn('perspective'),
          ]
        )
      } else if (type === 'rotate3d') {
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Rotate 3D', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-rotate3d-value'],
              '',
              { value: 10 }
            ),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-rotate3d-value'],
              '',
              { value: 30 }
            ),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-rotate3d-value'],
              '',
              { value: 50 }
            ),
            removeBtn('rotate3d'),
          ]
        )
      } else {
        return this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Translate 3D', '', ['cs-label']),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-translate3d-value'],
              '',
              { value: 10 }
            ),
            this.#_.createInput(
              'number',
              ['cs-num-input', 'cs-trans-translate3d-value'],
              '',
              { value: 30 }
            ),
            this.#_.createInput(
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
    let transformList = ['translate']
    const transformBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Transform', '', ['cs-label']),
            this.#_.createSelect(
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
            this.#_.createButton(
              'Add',
              ['inline-btn', 'text-primary'],
              '',
              (e) => {
                const key = this.#_.getNodeById('cs_transform_type').value
                if (transformList.findIndex((one) => one === key) !== -1) return
                transformList.push(key)
                e.target.parentElement.parentElement.appendChild(
                  transformListForm(key)
                )
              }
            ),
            this.#_.createButton(
              'Set Values',
              ['inline-btn', 'text-primary'],
              '',
              (e) => {
                this.#changeStyle(
                  'transform',
                  this.#calStylesData.calTransformValue(transformList)
                )
              }
            ),
          ]
        ),
        transformListForm('translate'),
      ],
      'transform_box'
    )
    return this.#_.createElement(
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
  createTypographyForm() {
    const fontSizeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Font-size', 'cs_font_size', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_font_size',
          '',
          '',
          (e) =>
            this.#changeStyle('font-size', `${e.target.value}${unitOne.value}`)
        ),
      ]
    )
    const fontFamilyBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Font-family', 'cs_font_family', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'Arial, sans-serif', text: 'Arial' },
            { value: 'Helvetica, sans-serif', text: 'Helvetica' },
            { value: 'Times New Roman, serif', text: 'Times New Roman' },
            { value: 'Courier New, monospace', text: 'Courier New' },
            { value: 'Verdana, sans-serif', text: 'Verdana' },
            { value: 'Georgia, serif', text: 'Georgia' },
            { value: 'Comic Sans MS, cursive', text: 'Comic Sans MS' },
            { value: 'Impact, sans-serif', text: 'Impact' },
            { value: 'Trebuchet MS, sans-serif', text: 'Trebuchet MS' },
            { value: 'Palatino, serif', text: 'Palatino' },
            { value: 'Circular, sans-serif', text: 'Circular' },
          ],
          'cs_font_family',
          (e) => this.#changeStyle('font-family', e.target.value)
        ),
      ]
    )
    const fontStyleBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Font-style', 'cs_font_style', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'normal', text: 'Normal' },
            { value: 'italic', text: 'Italic' },
            { value: 'oblique', text: 'Oblique' },
          ],
          'cs_font_style',
          (e) => this.#changeStyle('font-style', e.target.value)
        ),
      ]
    )
    const fontWeightBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Font-weight', 'cs_font_weight', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_font_weight',
          '',
          '',
          (e) => this.#changeStyle('font-weight', parseInt(e.target.value))
        ),
      ]
    )
    const lineHeightBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Line-height', 'cs_line_height', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_line_height',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'line-height',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const letterSpacingBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Letter Spacing', 'cs_letter_spacing', [
          'cs-label',
        ]),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_letter_spacing',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'letter-spacing',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const colorBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Color', 'cs_color', ['cs-label']),
        this.#_.createInput(
          'color',
          ['cs-color-input'],
          'cs_color',
          { value: '#000000' },
          '',
          (e) => this.#changeStyle('color', e.target.value)
        ),
      ]
    )
    const textDecoBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Text Decoration', 'cs_text_deco', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'none', text: 'None' },
            { value: 'underline', text: 'Underline' },
          ],
          'cs_text_deco',
          (e) => this.#changeStyle('text-decoration', e.target.value)
        ),
      ]
    )
    // text decoration
    let cs_text_ul_color_ip
    let cs_text_ul_type_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: 'dotted', text: 'Dotted' },
        { value: 'wavy', text: 'Wavy' },
      ],
      'cs_underline_type',
      (e) => {
        this.#changeStyle(
          'text-decoration',
          this.#calStylesData.calTextDecoration(
            e.target.value,
            cs_text_ul_color_ip.value
          )
        )
      }
    )
    const decoTypeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Text Decoration Types', 'cs_underline_type', [
          'cs-label',
        ]),
        cs_text_ul_type_s,
      ]
    )
    cs_text_ul_color_ip = this.#_.createInput(
      'color',
      ['cs-color-input'],
      'cs_underline_color',
      { value: '#000000' },
      '',
      (e) => {
        this.#changeStyle(
          'text-decoration',
          this.#calStylesData.calTextDecoration(
            cs_text_ul_type_s.value,
            e.target.value
          )
        )
      }
    )
    const decoColorBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Text Decoration Color', 'cs_underline_color', [
          'cs-label',
        ]),
        cs_text_ul_color_ip,
      ]
    )
    // align
    const textAlignBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Text align', 'cs_text_align', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'start', text: 'start' },
            { value: 'end', text: 'end' },
            { value: 'center', text: 'center' },
            { value: 'justify', text: 'justify' },
          ],
          'cs_text_align',
          (e) => this.#changeStyle('text-align', e.target.value)
        ),
      ]
    )
    const textIndentBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Text Indent', 'cs_text_idt', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_text_idt',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'text-indent',
              `${e.target.value}${unitOne.value}`
            )
        ),
      ]
    )
    const writingModeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Writing Mode', 'cs_writing_mode', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'horizontal-tb', text: 'Horizontal-tb' },
            { value: 'vertical-lr', text: 'Vertical-lr' },
            { value: 'vertical-rl', text: 'Vertical-rl' },
          ],
          'cs_writing_mode',
          (e) => this.#changeStyle('writing-mode', e.target.value)
        ),
      ]
    )
    // text-shadow
    const createTextShadowValue = () => {
      return this.#_.createElement(
        '',
        '',
        ['cs-ip-gp'],
        [
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-ts-xo'],
            '',
            { value: 2 },
            '',
            () =>
              this.#changeStyle(
                'text-shadow',
                this.#calStylesData.calTextShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-ts-yo'],
            '',
            { value: 2 },
            '',
            () =>
              this.#changeStyle(
                'text-shadow',
                this.#calStylesData.calTextShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-ts-blur'],
            '',
            { value: 5 },
            '',
            () =>
              this.#changeStyle(
                'text-shadow',
                this.#calStylesData.calTextShadowValue()
              )
          ),
          this.#_.createInput(
            'color',
            ['cs-color-input', 'cs-ts-color'],
            '',
            { value: '#000000' },
            '',
            () =>
              this.#changeStyle(
                'text-shadow',
                this.#calStylesData.calTextShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-ts-alpha'],
            '',
            { value: 5, min: 1, max: 10 },
            '',
            () =>
              this.#changeStyle(
                'text-shadow',
                this.#calStylesData.calTextShadowValue()
              )
          ),
          removeParentBtn(),
        ]
      )
    }
    const textShadowBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Text-Shadow', '', ['cs-label']),
            this.#_.createButton('Add', ['inline-btn'], '', (e) => {
              e.preventDefault()
              if (this.#_.getAllNodes('.cs-ts-xo').length > 2) return
              e.target.parentElement.parentElement.appendChild(
                createTextShadowValue()
              )
            }),
          ]
        ),
        createTextShadowValue(),
      ]
    )
    return this.#_.createElement(
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
  createBackgroundForm() {
    let cs_bg_color_ip
    let cs_opacity_ip
    cs_bg_color_ip = this.#_.createInput(
      'color',
      ['cs-color-input'],
      'cs_background',
      { value: '#000000' },
      '',
      (e) => {
        let opacity = Math.min(Math.max(parseInt(cs_opacity_ip.value), 1), 10)
        this.#changeStyle(
          'background-color',
          `rgba(${this.#calStylesData.hexToRgb(e.target.value)},${
            opacity / 10
          })`
        )
      }
    )
    cs_opacity_ip = this.#_.createInput(
      'number',
      ['cs-num-input'],
      'cs_bg_opacity',
      { value: 10 },
      '',
      (e) => {
        let opacity = Math.min(Math.max(parseInt(e.target.value), 1), 10)
        this.#changeStyle(
          'background-color',
          `rgba(${this.#calStylesData.hexToRgb(cs_bg_color_ip.value)},${
            opacity / 10
          })`
        )
      }
    )
    const bgBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Background', 'cs_background', ['cs-label']),
        cs_bg_color_ip,
        cs_opacity_ip,
      ]
    )
    // gradient
    const cs_bg_type_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: 'linear', text: 'Liner Gradient' },
        { value: 'radial', text: 'Radial Gradient' },
      ],
      'cs_bg_type'
    )
    const cs_bg_gradient_deg_ip = this.#_.createInput(
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
        this.#changeStyle(
          'background',
          this.#calStylesData.calGrdValue(
            cs_bg_type_s.value,
            this.#_.getAllNodes('.bg-grd-color'),
            e.target.value
          )
        )
    )
    const createGrdColorIp = () => {
      return this.#_.createInput(
        'color',
        ['cs-color-input', 'bg-grd-color'],
        '',
        {
          value: '#000000',
        },
        '',
        (e) =>
          this.#changeStyle(
            'background',
            this.#calStylesData.calGrdValue(
              cs_bg_type_s.value,
              this.#_.getAllNodes('.bg-grd-color'),
              cs_bg_gradient_deg_ip.value
            )
          )
      )
    }
    const bgGradientBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Gradient', 'cs_bg_type', ['cs-label']),
        cs_bg_type_s,
        cs_bg_gradient_deg_ip,
        createGrdColorIp(),
        createGrdColorIp(),
        createGrdColorIp(),
      ]
    )
    // bg image
    const bgImgBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Image', 'cs_bg_img', ['cs-label']),
        this.#_.createInput(
          '',
          ['cs-text-input'],
          'cs_bg_img',
          { placeholder: 'use link only' },
          '',
          (e) => this.#changeStyle('background-image', `url(${e.target.value})`)
        ),
      ]
    )
    const bgSizeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Size', 'cs_bg_size', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_bg_size',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'background-size',
              `${parseInt(e.target.value)}${unitOne.value}`
            )
        ),
      ]
    )
    const bgSizeAutoBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel(
          'Background Size ( predefined )',
          'cs_bg_size_pre',
          ['cs-label']
        ),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'contain', text: 'Contain' },
            { value: 'cover', text: 'Cover' },
            { value: 'auto, auto', text: 'Auto' },
          ],
          'cs_bg_size_pre',
          (e) => this.#changeStyle('background-size', e.target.value)
        ),
      ]
    )
    const bgRepeatBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Repeat', 'cs_bg_rp', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('background-repeat', e.target.value)
        ),
      ]
    )
    const bgPositionBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Position', 'cs_bg_pst', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('background-position', e.target.value)
        ),
      ]
    )
    const bgClipBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Clip', 'cs_bg_clip', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'border-box', text: 'Border-box' },
            { value: 'padding-box', text: 'Padding-box' },
            { value: 'content-box', text: 'Content-box' },
            { value: 'text', text: 'Text' },
          ],
          'cs_bg_clip',
          (e) => {
            if (e.target.value === 'text') {
              this.#changeSerialStyles(
                ['background-clip', '-webkit-background-clip', 'color'],
                ['text', 'text', 'transparent']
              )
            } else {
              this.#changeStyle('background-clip', e.target.value)
            }
          }
        ),
      ]
    )
    const bgAttachmentBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Background Attachment', 'cs_bg_attach', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('background-attachment', e.target.value)
        ),
      ]
    )

    return this.#_.createElement(
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

  createBorderAndOutlinesForm() {
    //  here boo is border or outline
    let cs_boo_type_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: 'border', text: 'Border' },
        { value: 'outline', text: 'Outline' },
      ],
      'cs_bOOChooser',
      (e) =>
        (this.#_.getNodeById('bOOChooser').textContent =
          e.target.value.toUpperCase())
    )
    let cs_boo_color_ip
    let cs_boo_style_s
    let cs_boo_width_ip
    let cs_boo_side_s

    const bOOBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel(
          'BORDER',
          'cs_bOOChooser',
          ['cs-label'],
          'bOOChooser'
        ),
        cs_boo_type_s,
      ]
    )
    cs_boo_width_ip = this.#_.createInput(
      'number',
      ['cs-num-input'],
      'cs_boo_width',
      { value: 2 },
      '',
      (e) => {
        const [key, value] = this.#calStylesData.manageBOO(
          cs_boo_type_s.value,
          cs_boo_side_s.value,
          cs_boo_style_s.value,
          `${parseInt(e.target.value)}${unitOne.value}`,
          cs_boo_color_ip.value
        )
        this.#changeStyle(key, value)
      }
    )
    const bOOWidthBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Width', 'cs_boo_width', ['cs-label']),
        cs_boo_width_ip,
      ]
    )
    cs_boo_style_s = this.#_.createSelect(
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
      (e) => {
        const [key, value] = this.#calStylesData.manageBOO(
          cs_boo_type_s.value,
          cs_boo_side_s.value,
          e.target.value,
          `${parseInt(cs_boo_width_ip.value)}${unitOne.value}`,
          cs_boo_color_ip.value
        )
        this.#changeStyle(key, value)
      }
    )
    const bOOTypeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Style', 'cs_boo_type', ['cs-label']),
        cs_boo_style_s,
      ]
    )
    cs_boo_color_ip = this.#_.createInput(
      'color',
      ['cs-color-input'],
      'cs_boo_color',
      { value: '#000000' },
      '',
      (e) => {
        const [key, value] = this.#calStylesData.manageBOO(
          cs_boo_type_s.value,
          cs_boo_side_s.value,
          cs_boo_style_s.value,
          `${parseInt(cs_boo_width_ip.value)}${unitOne.value}`,
          e.target.value
        )
        this.#changeStyle(key, value)
      }
    )
    const bOOColorBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Color', 'cs_boo_color', ['cs-label']),
        cs_boo_color_ip,
      ]
    )
    cs_boo_side_s = this.#_.createSelect(
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
    const bOOSideBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [this.#_.createLabel('Side', 'cs_boo_side', ['cs-label']), cs_boo_side_s]
    )
    // remove boo
    const rmBorderBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Remove border', 'cs_rm_border', ['cs-label']),
        this.#_.createInput(
          'checkbox',
          ['cs-checkbox'],
          'cs_rm_border',
          '',
          '',
          (e) =>
            this.#changeStyle('border', e.target.checked ? 'none' : '2px solid')
        ),
      ]
    )
    const rmOutlineBox = this.#_.createElement(
      '',
      '',
      ['cs-cb-gp'],
      [
        this.#_.createLabel('Remove outline', 'cs_rm_outline', ['cs-label']),
        this.#_.createInput(
          'checkbox',
          ['cs-checkbox'],
          'cs_rm_outline',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'outline',
              e.target.checked ? 'none' : '2px solid'
            )
        ),
      ]
    )
    // radius
    let cs_border_radius_1_ip
    let cs_border_radius_2_ip
    let cs_border_radius_3_ip
    let cs_border_radius_4_ip
    const createBRIp = () => {
      return this.#_.createInput('number', ['cs-num-input'], '', '', '', () => {
        const r1 = cs_border_radius_1_ip.value || 0
        const r2 = cs_border_radius_2_ip.value || 0
        const r3 = cs_border_radius_3_ip.value || 0
        const r4 = cs_border_radius_4_ip.value || 0
        this.#changeStyle(
          'border-radius',
          this.#calStylesData.calBorderRadius(r1, r2, r3, r4)
        )
      })
    }
    cs_border_radius_1_ip = createBRIp()
    cs_border_radius_2_ip = createBRIp()
    cs_border_radius_3_ip = createBRIp()
    cs_border_radius_4_ip = createBRIp()
    const borderRadiusBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createLabel('Border Radius', '', ['cs-label']),
        this.#_.createElement(
          '',
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
    return this.#_.createElement(
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

  createMiscellaneousForm() {
    const opacityBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Opacity 0 - 10', 'cs_opacity', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_opacity',
          { min: 0, max: 10 },
          '',
          (e) =>
            this.#changeStyle(
              'opacity',
              ` ${Math.min(Math.max(e.target.value, 1), 10) / 10}`
            )
        ),
      ]
    )
    const visibilityBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Visibility', 'cs_visibility', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'visible', text: 'Visible' },
            { value: 'hidden', text: 'Hidden' },
            { value: 'collapse', text: 'Collapse' },
          ],
          'cs_visibility',
          (e) => this.#changeStyle('visibility', e.target.value)
        ),
      ]
    )
    const cursorBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Cursor', 'cs_cursor', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('cursor', e.target.value)
        ),
      ]
    )
    // backdrop
    const cs_bd_filter_type_s = this.#_.createSelect(
      ['cs-select'],
      '',
      [
        { value: 'blur', text: 'Blur' },
        { value: 'invert', text: 'Invert' },
        { value: 'sepia', text: 'Sepia' },
      ],
      'cs_bd_filter_tp'
    )
    const backdropFilterBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Backdrop Filter', 'cs_bd_filter', ['cs-label']),
        cs_bd_filter_type_s,
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_bd_filter',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'backdrop-filter',
              `${cs_bd_filter_tp.value}(${parseInt(e.target.value)}${
                unitOne.value
              })`
            )
        ),
      ]
    )
    // filter
    const cs_filter_tp = this.#_.createSelect(
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
    const filterBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Filter', 'cs_filter', ['cs-label']),
        cs_filter_tp,
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_filter',
          '',
          '',
          (e) =>
            this.#changeStyle(
              'filter',
              `${cs_filter_tp.value}(${parseInt(e.target.value)}${
                unitOne.value
              })`
            )
        ),
      ]
    )
    const scrollBehaviorBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Scroll-behavior', 'cs_scroll_behave', [
          'cs-label',
        ]),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'auto', text: 'Auto' },
            { value: 'smooth', text: 'Smooth' },
          ],
          'cs_scroll_behave',
          (e) => this.#changeStyle('scroll-behavior', e.target.value)
        ),
      ]
    )
    // box shadow
    const boxShadowValueForm = () => {
      return this.#_.createElement(
        '',
        '',
        ['cs-ip-gp'],
        [
          this.#_.createSelect(['cs-select', 'cs-bs-type'], '', [
            { value: '', text: 'Out' },
            { value: 'inset', text: 'Inset' },
          ]),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-bs-xo'],
            '',
            { value: 5 },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-bs-yo'],
            '',
            { value: 5 },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-bs-blur'],
            '',
            { value: 2 },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-bs-spr'],
            '',
            { value: 2 },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          this.#_.createInput(
            'color',
            ['cs-color-input', 'cs-bs-color'],
            '',
            { value: '#000000' },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-bs-alpha'],
            '',
            { value: 5, min: 1, max: 10 },
            '',
            () =>
              this.#changeStyle(
                'box-shadow',
                this.#calStylesData.calBoxShadowValue()
              )
          ),
          removeParentBtn(),
        ]
      )
    }
    const boxShadowBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Box-Shadow', '', ['cs-label']),
            this.#_.createButton(
              'Add',
              ['inline-btn', 'text-primary'],
              '',
              (e) => {
                if (this.#_.getAllNodes('.cs-bs-type').length > 2) return
                e.target.parentElement.parentElement.appendChild(
                  boxShadowValueForm()
                )
              }
            ),
          ]
        ),
        this.#_.createElement('', '', ['cs-ip-gp']),
        boxShadowValueForm(),
      ]
    )
    // transition

    const transitionValuesForm = () => {
      return this.#_.createElement(
        '',
        '',
        ['cs-ip-gp'],
        [
          this.#_.createInput('', ['cs-text-input', 'cs-trans-name'], '', {
            value: 'opacity',
          }),
          this.#_.createInput(
            'number',
            ['cs-num-input', 'cs-trans-prd'],
            '',
            { min: 0, value: 3 },
            '',
            () =>
              this.#changeStyle(
                'transition',
                this.#calStylesData.calTransitionValues(
                  this.#_.getAllNodes('.cs-trans-prd'),
                  this.#_.getAllNodes('.cs-trans-ef')
                )
              )
          ),
          this.#_.createSelect(
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
              this.#changeStyle(
                'transition',
                this.#calStylesData.calTransitionValues(
                  this.#_.getAllNodes('.cs-trans-prd'),
                  this.#_.getAllNodes('.cs-trans-ef')
                )
              )
          ),
          removeParentBtn(),
        ]
      )
    }
    const transitionBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Transition', '', ['cs-label']),
            this.#_.createButton(
              'Add',
              ['inline-btn', 'text-primary'],
              '',
              (e) => {
                if (this.#_.getAllNodes('.cs-trans-name').length > 2) return
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
    const customStyleKey = this.#_.createInput('', ['cs-text-input'], '', {
      required: true,
    })
    const customStyleValue = this.#_.createInput('', ['cs-text-input'], '', {
      required: true,
    })
    const customStyleInput = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        customStyleKey,
        customStyleValue,
        this.#_.createButton(
          'Set custom style',
          ['btn', 'btn-sm', 'text-primary'],
          '',
          (e) => {
            const key = customStyleKey.value
            const value = customStyleValue.value
            if (!(key && value)) return
            this.#changeStyle(key, value)
          }
        ),
      ]
    )
    return this.#_.createElement(
      '',
      '',
      ['styler-box'],
      [
        opacityBox,
        visibilityBox,
        cursorBox,
        backdropFilterBox,
        filterBox,
        scrollBehaviorBox,
        boxShadowBox,
        transitionBox,
        customStyleInput,
      ]
    )
  }

  // display ( inline , none , block , inline-block  )
  // display-flex / flex-direction (row , row-reverse ,column , column-reverse )
  // justify-content ( center , start ,space-between, space-around , space-evenly )
  // align-items ( stretch , center , start , end )
  // align-self ( stretch , center , start , end )

  // ---- grid ------------- need to make familiar update----------- //
  createDisplayForm() {
    const displayBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Display', 'cs_display', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('display', e.target.value)
        ),
      ]
    )
    const flexBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Flex', 'cs_flex', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_flex',
          '',
          '',
          (e) => this.#changeStyle('flex', parseInt(e.target.value))
        ),
      ]
    )
    const flexDirectionBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Flex Direction', 'cs_flex_dir', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'column', text: 'Column' },
            { value: 'column-reverse', text: 'Column Reverse' },
            { value: 'row', text: 'Row' },
            { value: 'row-reverse', text: 'Row Reverse' },
          ],
          'cs_flex_dir',
          (e) => this.#changeStyle('flex-direction', e.target.value)
        ),
      ]
    )
    const flexWrapBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Flex Wrap', 'cs_flex_wrap', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: 'wrap', text: 'Wrap' },
            { value: 'nowrap', text: 'No Wrap' },
            { value: 'wrap-reverse', text: 'Wrap Reverse' },
          ],
          'cs_flex_wrap',
          (e) => this.#changeStyle('flex-wrap', e.target.value)
        ),
      ]
    )
    const justifyContentBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Justify Content', 'cs_justify_cnt', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('justify-content', e.target.value)
        ),
      ]
    )
    const alignItemsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Align Items', 'cs_algin_items', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('align-items', e.target.value)
        ),
      ]
    )
    const alignContentBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Align Content', 'cs_align_cnt', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('align-content', e.target.value)
        ),
      ]
    )
    const alignSelfBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Align-self', 'cs_align_self', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('align-self', e.target.value)
        ),
      ]
    )
    const justifySelfBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Justify-self', 'cs_justify_self', ['cs-label']),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('justify-self', e.target.value)
        ),
      ]
    )
    const readyGridTempColsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Grid-template-columns', 'cs_rdy_grd_temp_cols', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('grid-template-columns', e.target.value)
        ),
      ]
    )
    const cusGridTempColsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel(
          'Custom grid-template-columns',
          'cs_cus_grd_temp_cols',
          ['cs-label']
        ),
        this.#_.createInput(
          '',
          ['cs-text-input'],
          'cs_cus_grd_temp_cols',
          { disabled: true },
          '',
          (e) => this.#changeStyle('grid-template-columns', e.target.value)
        ),
      ]
    )
    const readyGridTempRowsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Grid-template-rows', 'cs_rdy_grd_temp_rows', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          (e) => this.#changeStyle('grid-template-rows', e.target.value)
        ),
      ]
    )
    const cusGridTempRowsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel(
          'Custom grid-template-rows',
          'cs_cus_grd_temp_rows',
          ['cs-label']
        ),
        this.#_.createInput(
          '',
          ['cs-text-input'],
          'cs_cus_grd_temp_rows',
          { disabled: true },
          '',
          (e) => this.#changeStyle('grid-template-rows', e.target.value)
        ),
      ]
    )
    const readyGridColsBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Col & Row Set', 'cs_rdy_grd_col_row', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
            this.#changeSerialStyles(
              ['grid-column', 'grid-row'],
              e.target.value.split('-/-')
            )
        ),
      ]
    )
    const cusGridColBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Custom grid-column', 'cs_cus_grd_col', [
          'cs-label',
        ]),

        this.#_.createInput(
          '',
          ['cs-text-input'],
          'cs_cus_grd_col',
          { disabled: true },
          '',
          (e) => this.#changeStyle('grid-column', e.target.value)
        ),
      ]
    )
    const cusGridRowBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Custom grid-row', 'cs_cus_grd_row', ['cs-label']),
        this.#_.createInput(
          '',
          ['cs-text-input'],
          'cs_cus_grd_row',
          { disabled: true },
          '',
          (e) => this.#changeStyle('grid-row', e.target.value)
        ),
      ]
    )
    // grid column start
    let cs_grid_col_or_row_ip
    let cs_grid_col_or_row_c
    const cs_grid_col_or_row_s = this.#_.createSelect(['cs-select'], '', [
      { value: 'grid-column-start', text: 'Grid-col-start' },
      { value: 'grid-column-end', text: 'Grid-col-end' },
      { value: 'grid-row-start', text: 'Grid-row-start' },
      { value: 'grid-row-end', text: 'Grid-row-end' },
    ])
    cs_grid_col_or_row_ip = this.#_.createInput(
      'number',
      ['cs-num-input'],
      '',
      { value: 2 },
      '',
      (e) =>
        this.#changeStyle(
          cs_grid_col_or_row_s.value,
          `${cs_grid_col_or_row_c.checked ? 'span ' : ''}${e.target.value}`
        )
    )
    cs_grid_col_or_row_c = this.#_.createInput(
      'checkbox',
      ['cs-checkbox'],
      'cs_grd_span',
      '',
      '',
      (e) =>
        this.#changeStyle(
          cs_grid_col_or_row_s.value,
          `${e.target.checked ? 'span ' : ''}${parseInt(
            cs_grid_col_or_row_ip.value
          )}`
        )
    )
    const grdColOrRowBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        cs_grid_col_or_row_s,
        cs_grid_col_or_row_ip,
        cs_grid_col_or_row_c,
        this.#_.createLabel('span', 'cs_grd_span', ['cs-label']),
      ]
    )
    return this.#_.createElement(
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

  createAnimationForm() {
    const aniNameBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Name', 'cs_ani_name', ['cs-label']),
        this.#_.createSelect(['cs-select'], '', [], 'cs_ani_name', () => {
          const name = this.#_.getNodeById('cs_ani_name').value
          if (!name) return
          const value = this.#calStylesData.calAnimationValue()
          if (!value) return
          this.#changeStyle('animation', `${name} ${value}`)
        }),
      ]
    )
    const aniDurationBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Duration', 'cs_ani_duration', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_ani_duration',
          { value: 20 },
          '',
          () => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniTimingFnBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Timing Function', 'cs_ani_timing_fn', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          () => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniDelayBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Delay Time', 'cs_ani_delay', ['cs-label']),
        this.#_.createInput(
          'number',
          ['cs-num-input'],
          'cs_ani_delay',
          { value: '0' },
          '',
          () => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniIterationCountBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Iteration Count', 'cs_ani_itr_count', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          (e) => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniDirectionBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Direction', 'cs_ani_direction', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: '', text: 'None' },
            { value: 'reverse', text: 'Reverse' },
            { value: 'alternate', text: 'Alternate' },
            { value: 'alternate-reverse', text: 'Alternate-reverse' },
          ],
          'cs_ani_direction',
          () => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniFillModeBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Fill Mode', 'cs_ani_fill_mode', ['cs-label']),
        this.#_.createSelect(
          ['cs-select'],
          '',
          [
            { value: '', text: 'None' },
            { value: 'forwards', text: 'Forwards' },
            { value: 'backwards', text: 'Backwards' },
            { value: 'both', text: 'Both' },
          ],
          'cs_ani_fill_mode',
          () => {
            const name = this.#_.getNodeById('cs_ani_name').value
            if (!name) return
            const value = this.#calStylesData.calAnimationValue()
            if (!value) return
            this.#changeStyle('animation', `${name} ${value}`)
          }
        ),
      ]
    )
    const aniTimeLineScrollBox = this.#_.createElement(
      '',
      '',
      ['cs-ip-gp'],
      [
        this.#_.createLabel('Timeline Scroll', 'cs_ani_timeLine_scroll', [
          'cs-label',
        ]),
        this.#_.createSelect(
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
          (e) =>
            this.#changeStyle('animation-timeline', `scroll(${e.target.value})`)
        ),
      ]
    )

    const aniTimelineViewBox = this.#_.createElement(
      '',
      '',
      ['cs-lg-gp'],
      [
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Timeline View', 'cs_ani_timeline_view', [
              'cs-label',
            ]),
            this.#_.createSelect(
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
            this.#_.createButton(
              'Set',
              ['inline-btn', 'text-primary'],
              '',
              (e) => {
                this.#changeStyle(
                  'animation-timeline',
                  this.#calStylesData.calAniTimeLineValue()
                )
              }
            ),
          ]
        ),
        this.#_.createElement(
          '',
          '',
          ['cs-ip-gp'],
          [
            this.#_.createLabel('Cus-1', '', ['cs-label']),
            this.#_.createInput('number', [
              'cs-num-input',
              'ani-tl-view-arg-value',
            ]),
            this.#_.createLabel('Cus-2', '', ['cs-label']),
            this.#_.createInput('number', [
              'cs-num-input',
              'ani-tl-view-arg-value',
            ]),
          ]
        ),
      ]
    )

    return this.#_.createElement(
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

  #changeStyle(key, value) {
    clearTimeout(this.#spamBlocker)
    this.#spamBlocker = setTimeout(() => {
      this.#changeAppliedStyes(key, value)
    }, 500)
  }

  #changeSerialStyles(key, value) {
    clearTimeout(this.#spamBlocker)
    this.#spamBlocker = setTimeout(() => {
      key.forEach((one, index) => {
        this.#changeAppliedStyes(one, value[index])
      })
    }, 500)
  }
  // end
}

export { StylerBoxCreator, unitSelectors }
