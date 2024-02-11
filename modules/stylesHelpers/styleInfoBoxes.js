'use strict'

import _ from '../dom/index.js'
import { createCusStyleInfoShower } from './customStyles.js'
import {
  addNewAnimation,
  createAnimationInfoShower,
  animations,
  deleteAnimation,
} from './animations.js'
import {
  createPredStyleInfoFrag,
  createPredStyleInfoShower,
} from './predefinedStyles.js'
import {
  addNewClassName,
  classNames,
  createCNInfoShower,
  removeClassName,
} from './classNameStyles.js'
import notifier from '../notify.js'

class StyleInfoBox {
  constructor() {
    this._ = _
    this.notifier = notifier
    this.infoBoxEvtCleaner = () => {}
    this.infoBox = this._.createElement('', '', ['style-info-box'], [])
    this._.getNode('.styled-info').appendChild(this.infoBox)
  }

  #render(form, box) {
    this.infoBox.innerHTML = ''
    this.infoBox.appendChild(form)
    this.infoBox.appendChild(box)
  }

  targetStyleInfoBox(selectedNode) {
    const target = this._.getNode(selectedNode)
    this._.getNodeById('switch_css_mode')[0].selected = true
    // initial wrapper
    const [listenerWrapper, wrapperEvtCleaner] =
      createCusStyleInfoShower(selectedNode)

    const availableCnSelect = this._.createSelect(
      ['cs-select'],
      '',
      [],
      'add_class_list_selector'
    )
    for (let cn in classNames) {
      this._.createOption(availableCnSelect, cn, cn, cn)
    }

    const createClassNameInfo = (name) => {
      const [delBtn, cleaner] = this._.createButton(
        'Del',
        ['inline-btn', 'text-danger', 'float-end'],
        '',
        function (e) {
          e.target.parentElement.remove()
          target.classList.remove(name)
        },
        true
      )
      return [
        this._.createElement(
          '',
          '',
          ['style-info', 'my-1'],
          [this._.createSpan(name, ['css-key', 'mx-1']), delBtn]
        ),
        cleaner,
      ]
    }
    const appliedClassList = target.className.split(' ')

    const classListFrag = this._.createFragment()
    // add to clean-list
    const infoEvtCleaners = []
    appliedClassList.forEach((cn) => {
      if (!cn) return
      const [info, cleaner] = createClassNameInfo(cn)
      classListFrag.appendChild(info)
      infoEvtCleaners.push(cleaner)
    })

    const [addClassNameBtn, addClassNameBtnEvtCleaner] = this._.createButton(
      'Add',
      ['inline-btn', 'text-primary'],
      '',
      () => {
        const name = this._.getNodeById('add_class_list_selector').value
        if (!name) {
          this.notifier.on('noAvailableCN')
          return
        }
        if (target.classList.contains(name)) return
        target.classList.add(name)
        const [info, cleaner] = createClassNameInfo(name)
        infoEvtCleaners.push(cleaner)
        this._.getNode('.applied-classlist').appendChild(info)
      },
      true
    )
    const classListBox = this._.createElement(
      '',
      '',
      ['available-class-list'],
      [
        this._.createElement('', '', '', [availableCnSelect, addClassNameBtn]),
        this._.createHeading('h6', 'Added ClassList'),
        this._.createElement('', '', ['applied-classlist'], [classListFrag]),
      ]
    )
    // clean up previous events and set up event cleaner
    this.infoBoxEvtCleaner()
    this.infoBoxEvtCleaner = () => {
      addClassNameBtnEvtCleaner()
      wrapperEvtCleaner()
      infoEvtCleaners.forEach((cleaner) => cleaner())
    }
    this.#render(classListBox, listenerWrapper)
  }

  predefinedStylesBox(selectedEle) {
    const [wrapper, wrapperEvtCleaner] = createPredStyleInfoShower(selectedEle)
    const [predSelector, predSelectorEvtCleaner] = this._.createSelect(
      ['form-select'],
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
        { value: 'paragraph', text: 'Paragraph' },
        { value: 'list', text: 'List' },
        { value: 'table', text: 'Table' },
        { value: 'selection', text: 'Selection' },
        { value: 'span', text: 'Span' },
        { value: 'figure', text: 'Figure' },
        { value: 'hr', text: 'Horizontal break' },
      ],
      'predefined_element',
      (e) => {
        wrapper.innerHTML = ''
        wrapper.appendChild(createPredStyleInfoFrag(e.target.value))
      },
      true
    )

    // set up event cleaner and clean up previous event
    this.infoBoxEvtCleaner()
    this.infoBoxEvtCleaner = () => {
      predSelectorEvtCleaner()
      wrapperEvtCleaner()
    }

    this.#render(predSelector, wrapper)
  }

  animationBox() {
    //form creation
    let name
    for (const animation in animations) {
      name = animation
      break
    }
    // initial wrapper
    let [wrapper, wrapperEvtCleaner] = createAnimationInfoShower(name)

    // update to real dom as user's action
    const updateInfoWrapper = (name) => {
      wrapperEvtCleaner()
      const [newWrapper, newWrapperEvtCleaner] = createAnimationInfoShower(name)
      // update real dom
      this._.getNode('.style-info-listener-wrapper').replaceWith(newWrapper)
      wrapperEvtCleaner = newWrapperEvtCleaner
    }

    const [animationsSelect, animationSelectEvtCleaner] = this._.createSelect(
      ['cs-select'],
      '',
      [],
      'cs_animation_list',
      (e) => updateInfoWrapper(e.target.value),
      true
    )

    const [addBtn, addBtnEvtCleaner] = this._.createButton(
      'Add',
      ['inline-btn', 'text-primary'],
      '',
      () => {
        const name = this._.getNodeById('cs_add_animation_name').value
        if (name in animations) {
          this.notifier.on('existedAnimation')
          return
        }
        if (!isNaN(parseInt(name))) {
          this.notifier.on('invalidInput')
          return
        }
        if (!name) {
          this.notifier.on('invalidInput')
          return
        }
        if (this._.getNodeById('cs_ani_name')) {
          this._.createOption(
            this._.getNodeById('cs_ani_name'),
            name,
            name,
            name
          )
        }
        this._.createOption(animationsSelect, name, name, name)
        animationsSelect[animationsSelect.length - 1].selected = true
        addNewAnimation(name)
        updateInfoWrapper(name)
      },
      true
    )

    const addNewAnimationBox = this._.createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        this._.createLabel('Animation name', 'cs_add_animation_name', [
          'cs-label',
        ]),
        this._.createInput('', ['cs-text-input'], 'cs_add_animation_name', {
          placeholder: 'Must provide',
        }),
        addBtn,
      ]
    )

    for (let name in animations) {
      this._.createOption(animationsSelect, name, name, name)
    }

    const [delBtn, delBtnEvtCleaner] = this._.createButton(
      'Del',
      ['inline-btn', 'text-danger'],
      '',
      (e) => {
        e.preventDefault()
        const name = animationsSelect.value
        if (!name) return
        this._.getNodeById(`${name}`).remove()
        let prevName = ''
        deleteAnimation(name)
        for (const name in animations) {
          prevName = name
          break
        }
        updateInfoWrapper(prevName)
      },
      true
    )

    const keyFrameSelectorBox = this._.createElement(
      'div',
      '',
      ['cs-ip-gp'],
      [
        this._.createLabel(
          'Keyframe Selector',
          'cs_add_animation_kf_selector',
          ['cs-label']
        ),
        this._.createInput(
          'number',
          ['cs-num-input'],
          'cs_add_animation_kf_selector',
          {
            value: 50,
          }
        ),
        animationsSelect,
        delBtn,
      ]
    )

    const form = this._.createFragment([
      addNewAnimationBox,
      keyFrameSelectorBox,
    ])
    // form creation done

    // set up event cleaner and clean up previous event
    this.infoBoxEvtCleaner()
    this.infoBoxEvtCleaner = () => {
      addBtnEvtCleaner()
      animationSelectEvtCleaner()
      delBtnEvtCleaner()
      wrapperEvtCleaner()
    }
    this.#render(form, wrapper)
  }

  classNamesBox() {
    // initial wrapper
    let cn = ''
    for (const className in classNames) {
      cn = className
      break
    }
    let [wrapper, wrapperEvtCleaner] = createCNInfoShower(cn)

    // update to real dom as user's action
    const updateInfoWrapper = (name) => {
      wrapperEvtCleaner()
      const [newWrapper, newWrapperEvtCleaner] = createCNInfoShower(name)
      // update real dom
      this._.getNode('.style-info-listener-wrapper').replaceWith(newWrapper)
      wrapperEvtCleaner = newWrapperEvtCleaner
    }

    const [cnSelect, cnSelectCleaner] = this._.createSelect(
      ['cs-select'],
      '',
      [],
      'class_name_list',
      (e) => {
        updateInfoWrapper(e.target.value)
      },
      true
    )
    for (let name in classNames) {
      this._.createOption(cnSelect, name, name, name)
    }
    const [delBtn, delBtnEvtCleaner] = this._.createButton(
      'Del',
      ['inline-btn', 'text-danger'],
      '',
      () => {
        const name = cnSelect.value
        if (!name) return
        this._.getNodeById(`${name}`).remove()
        removeClassName(name)
        let prevName = ''
        for (const name in classNames) {
          prevName = name
          break
        }
        updateInfoWrapper(prevName)
      },
      true
    )
    const addNewCnInput = this._.createInput(
      '',
      ['cs-text-input'],
      'add_new_cn'
    )
    const [addBtn, addBtnCleaner] = this._.createButton(
      'Add',
      ['inline-btn'],
      '',
      () => {
        let name = addNewCnInput.value
        if (!name || !isNaN(parseInt(name[0]))) {
          this.notifier.on('invalidInput')
          return
        }
        name = `prv-${name.trim().split(' ').join('-')}`
        if (classNames[name]) {
          this.notifier.on('existedCN')
          return
        }
        addNewClassName(name)
        this._.createOption(
          this._.getNodeById('class_name_list'),
          name,
          name,
          name
        )
        updateInfoWrapper(name)
        cnSelect[cnSelect.length - 1].selected = true
      },
      true
    )
    const form = this._.createElement(
      '',
      '',
      [
        'class-names-form',
        'd-flex',
        'justify-content-between',
        'align-items-center',
      ],
      [delBtn, cnSelect, addNewCnInput, addBtn]
    )

    // set up event cleaner and clean up previous event
    this.infoBoxEvtCleaner()
    this.infoBoxEvtCleaner = () => {
      cnSelectCleaner()
      delBtnEvtCleaner()
      addBtnCleaner()
      wrapperEvtCleaner()
    }

    this.#render(form, wrapper)
  }
}

export default new StyleInfoBox()
