import {
  createButton,
  createElement,
  createFragment,
  createHeading,
  createOption,
  createSelect,
  createSpan,
  getNode,
} from '../dom/index.js'
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

//    <div class="available-classlist">
//      <select>
//      </select>
//      <button>add</button>
//    </div>
//    <div class="applied-classlist">
//      <div class="style-info">
//          <span class="class-name"></span>
//          <button>Del</button>
//      </div>
//    </div>

function createTargetStyleInfoBox(selectedNode) {
  const styleInfoHolder = getNode('.styled-info')
  styleInfoHolder.lastChild.remove()
  getNode('#switch_css_mode')[0].selected = true
  const styleInfo = createCusStyleInfoShower(selectedNode)
  function createCNSelect() {
    const select = createSelect(
      ['cs-select'],
      '',
      [],
      'add_class_list_selector'
    )
    for (let cn in classNames) {
      createOption(select, cn, cn, cn)
    }
    return select
  }
  function createClassNameInfo(name) {
    return createElement(
      '',
      '',
      ['style-info', 'my-1'],
      [
        createSpan(name, ['css-key', 'mx-1']),
        createButton(
          'Del',
          ['inline-btn', 'text-danger', 'float-end'],
          '',
          function (e) {
            e.target.parentElement.remove()
            getNode(selectedNode).classList.remove(name)
          }
        ),
      ]
    )
  }
  const appliedClassList = getNode(selectedNode).className.split(' ')
  const classListFrag = createFragment()
  appliedClassList.forEach((cn) => {
    if (!cn) return
    classListFrag.appendChild(createClassNameInfo(cn))
  })
  function createClassListBox() {
    return createElement(
      '',
      '',
      ['available-class-list'],
      [
        createElement('', '', '', [
          createCNSelect(),
          createButton('Add', ['inline-btn', 'text-primary'], '', function (e) {
            const name = getNode('#add_class_list_selector').value
            const target = getNode(selectedNode)
            if (target.classList.contains(name)) return
            target.classList.add(name)
            getNode('.applied-classlist').appendChild(createClassNameInfo(name))
          }),
        ]),
        createHeading('h6', 'Added ClassList'),
        createElement('', '', ['applied-classlist'], [classListFrag]),
      ]
    )
  }
  styleInfo.appendChild(createClassListBox())
  styleInfoHolder.appendChild(styleInfo)
}

function createAnimationsBox() {
  const styleInfoHolder = getNode('.styled-info')
  styleInfoHolder.lastChild.remove()
  const fragment = createFragment()
  for (const key in animations) {
    fragment.appendChild(animationInfoShower(key))
    break
  }

  styleInfoHolder.appendChild(
    createElement(
      '',
      '',
      ['animation-box'],
      [
        createElement('', '', ['animation-form'], [createAnimationForm()]),
        createElement('', '', ['animation-info'], [fragment]),
      ]
    )
  )
}

function createPredefinedStylesBox(selectedEle) {
  const styleInfoHolder = getNode('.styled-info')
  styleInfoHolder.lastChild.remove()

  const pred_tool_box = createElement(
    '',
    '',
    ['predefined-elements-box'],
    [
      createSelect(
        [''],
        '',
        [
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
          const styleInfo = createElement(
            '',
            '',
            ['predefined-styles-info'],
            [createPredStyleInfoFrag(e.target.value)]
          )
          getNode('.predefined-styles-info').remove()
          getNode('.predefined-styles-box').appendChild(styleInfo)
        }
      ),
    ]
  )

  styleInfoHolder.appendChild(
    createElement(
      '',
      '',
      ['predefined-styles-box'],
      [
        pred_tool_box,
        createElement(
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
  const styleInfoHolder = getNode('.styled-info')
  styleInfoHolder.lastChild.remove()

  const fragment = createFragment()
  if (Object.keys(classNames).length !== 0) {
    for (let className in classNames) {
      fragment.appendChild(createCNInfoShower(className))
      break
    }
  } else {
    fragment.appendChild(createCNInfoShower(cn))
  }
  styleInfoHolder.appendChild(
    createElement('', '', ['class-names-box'], [createCNForm(), fragment])
  )
}

export {
  createTargetStyleInfoBox,
  createAnimationsBox,
  createPredefinedStylesBox,
  createClassNamesBox,
}
