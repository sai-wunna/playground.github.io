import Document from '../dom/index.js'
import { createCusStyleInfoShower } from './customStyles.js'
import {
  animationInfoShower,
  animations,
  createAnimationForm,
} from './animations.js'
import { createPredStyleInfoFrag } from './predefinedStyles.js'
import {
  classNames,
  createCNForm,
  createCNInfoShower,
} from './classNameStyles .js'
import Alert from '../alert.js'

const _ = Document()
const alert = Alert()

function createTargetStyleInfoBox(selectedNode) {
  const styleInfoHolder = _.getNode('.styled-info')
  styleInfoHolder.lastChild.remove()
  _.getNodeById('switch_css_mode')[0].selected = true
  const styleInfo = createCusStyleInfoShower(selectedNode)
  function createCNSelect() {
    const select = _.createSelect(
      ['cs-select'],
      '',
      [],
      'add_class_list_selector'
    )
    for (let cn in classNames) {
      _.createOption(select, cn, cn, cn)
    }
    return select
  }
  function createClassNameInfo(name) {
    return _.createElement(
      '',
      '',
      ['style-info', 'my-1'],
      [
        _.createSpan(name, ['css-key', 'mx-1']),
        _.createButton(
          'Del',
          ['inline-btn', 'text-danger', 'float-end'],
          '',
          function (e) {
            e.target.parentElement.remove()
            _.getNode(selectedNode).classList.remove(name)
          }
        ),
      ]
    )
  }
  const appliedClassList = _.getNode(selectedNode).className.split(' ')
  const classListFrag = _.createFragment()
  appliedClassList.forEach((cn) => {
    if (!cn) return
    classListFrag.appendChild(createClassNameInfo(cn))
  })
  function createClassListBox() {
    return _.createElement(
      '',
      '',
      ['available-class-list'],
      [
        _.createElement('', '', '', [
          createCNSelect(),
          _.createButton(
            'Add',
            ['inline-btn', 'text-primary'],
            '',
            function (e) {
              const name = _.getNodeById('add_class_list_selector').value
              if (!name) {
                alert.alertMe('noAvailableCN')
                return
              }
              const target = _.getNode(selectedNode)
              if (target.classList.contains(name)) return
              target.classList.add(name)
              _.getNode('.applied-classlist').appendChild(
                createClassNameInfo(name)
              )
            }
          ),
        ]),
        _.createHeading('h6', 'Added ClassList'),
        _.createElement('', '', ['applied-classlist'], [classListFrag]),
      ]
    )
  }
  styleInfo.appendChild(createClassListBox())
  styleInfoHolder.appendChild(styleInfo)
}

function createAnimationsBox() {
  const styleInfoHolder = _.getNode('.styled-info')
  styleInfoHolder.lastChild.remove()
  const fragment = _.createFragment()
  for (const key in animations) {
    fragment.appendChild(animationInfoShower(key))
    break
  }

  styleInfoHolder.appendChild(
    _.createElement(
      '',
      '',
      ['animation-box'],
      [
        _.createElement('', '', ['animation-form'], [createAnimationForm()]),
        _.createElement('', '', ['animation-info'], [fragment]),
      ]
    )
  )
}

function createPredefinedStylesBox(selectedEle) {
  const styleInfoHolder = _.getNode('.styled-info')
  styleInfoHolder.lastChild.remove()

  const pred_tool_box = _.createElement(
    '',
    '',
    ['predefined-elements-box'],
    [
      _.createSelect(
        ['cs-select'],
        '',
        [
          { value: 'all', text: '* ( any type of elements inside body )' },
          { value: 'button', text: 'Button' },
          { value: 'link', text: 'Link' },
          { value: 'h1', text: 'Heading One' },
          { value: 'h2', text: 'Heading Two' },
          { value: 'h3', text: 'Heading Three' },
          { value: 'h4', text: 'Heading Four' },
          { value: 'h5', text: 'Heading Five' },
          { value: 'h6', text: 'Heading Six' },
          { value: 'block', text: 'Block' },
          { value: 'image', text: 'Image' },
          { value: 'p', text: 'Paragraph' },
          { value: 'list', text: 'List' },
          { value: 'table', text: 'Table' },
          { value: 'selection', text: 'Selection' },
          { value: 'span', text: 'Span' },
          { value: 'figure', text: 'Figure' },
          { value: 'hr', text: 'Horizontal break' },
        ],
        'predefined_element',
        function (e) {
          const styleInfo = _.createElement(
            '',
            '',
            ['predefined-styles-info'],
            [createPredStyleInfoFrag(e.target.value)]
          )
          _.getNode('.predefined-styles-info').remove()
          _.getNode('.predefined-styles-box').appendChild(styleInfo)
        }
      ),
    ]
  )

  styleInfoHolder.appendChild(
    _.createElement(
      '',
      '',
      ['predefined-styles-box'],
      [
        pred_tool_box,
        _.createElement(
          '',
          '',
          ['predefined-styles-info'],
          [createPredStyleInfoFrag(selectedEle)]
        ),
      ]
    )
  )
}

function createClassNamesBox(cn = '') {
  const styleInfoHolder = _.getNode('.styled-info')
  styleInfoHolder.lastChild.remove()

  const fragment = _.createFragment()
  if (Object.keys(classNames).length !== 0) {
    for (let className in classNames) {
      fragment.appendChild(createCNInfoShower(className))
      break
    }
  } else {
    fragment.appendChild(createCNInfoShower(cn))
  }
  styleInfoHolder.appendChild(
    _.createElement('', '', ['class-names-box'], [createCNForm(), fragment])
  )
}

export {
  createTargetStyleInfoBox,
  createAnimationsBox,
  createPredefinedStylesBox,
  createClassNamesBox,
}
