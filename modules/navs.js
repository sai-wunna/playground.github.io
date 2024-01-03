import Document from './dom/index.js'
import { closeNav, openNav } from './helpers/navAnimator.js'
import { lockBtn } from './helpers/lockBtn.js'
import { downloadForm } from './builder.js'

const _ = Document()

const element_create_wrapper = _.getNode('.create-element-form-wrapper')
const elements_opener_btn = _.getNode('.elements_opener')
const eWCloseBtn = _.getNode('.close-create-elements-wrapper')

const style_tools_wrapper = _.getNode('.styler-tools-wrapper')
const tools_opener_btn = _.getNode('.tools_opener')
const tWCloseBtn = _.getNode('.close-tools-wrapper')

const stacks_wrapper = _.getNode('.element-stacks-wrapper')
const stacks_opener_btn = _.getNode('.stacks_opener')
const sWCloseBtn = _.getNode('.close-stacks-wrapper')

const editor_wrapper = _.getNode('.editor-wrapper')
const editor_opener_btn = _.getNode('.editor_opener')
const editorCloseBtn = _.getNode('.close-editor-wrapper')

const download_form_btn = _.getNode('.download_form_opener')

_.on('click', elements_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(elements_opener_btn)
  if (element_create_wrapper.classList.contains('open-ele-wrapper')) {
    closeNav(element_create_wrapper, 'open-ele-wrapper')
  } else {
    openNav(element_create_wrapper, 'open-ele-wrapper')
  }
})
_.on('click', eWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(element_create_wrapper, 'open-ele-wrapper')
})

_.on('click', tools_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(tools_opener_btn)
  if (style_tools_wrapper.classList.contains('open-tools-wrapper')) {
    closeNav(style_tools_wrapper, 'open-tools-wrapper')
  } else {
    openNav(style_tools_wrapper, 'open-tools-wrapper')
  }
})
_.on('click', tWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(style_tools_wrapper, 'open-tools-wrapper')
})

_.on('click', stacks_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(stacks_opener_btn)
  if (stacks_wrapper.classList.contains('open-stacks-wrapper')) {
    closeNav(stacks_wrapper, 'open-stacks-wrapper')
  } else {
    openNav(stacks_wrapper, 'open-stacks-wrapper')
  }
})
_.on('click', sWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(stacks_wrapper, 'open-stacks-wrapper')
})

_.on('click', editor_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(editor_opener_btn)
  if (editor_wrapper.classList.contains('open-editor-wrapper')) {
    closeNav(editor_wrapper, 'open-editor-wrapper')
  } else {
    openNav(editor_wrapper, 'open-editor-wrapper')
  }
})
_.on('click', editorCloseBtn, (e) => {
  e.preventDefault()
  closeNav(editor_wrapper, 'open-editor-wrapper')
})

function setPriorityWrapper(wp) {
  if (wp.classList.contains('priority-wrapper-box')) return
  _.getNode('.priority-wrapper-box')?.classList.remove('priority-wrapper-box')
  wp.classList.add('priority-wrapper-box')
}

_.on('click', element_create_wrapper, (e) => {
  if (e.target.classList.contains('close-create-elements-wrapper')) return
  setPriorityWrapper(element_create_wrapper)
})

_.on('click', style_tools_wrapper, (e) => {
  if (e.target.classList.contains('close-tools-wrapper')) return
  setPriorityWrapper(style_tools_wrapper)
})

_.on('click', stacks_wrapper, (e) => {
  if (e.target.classList.contains('close-stacks-wrapper')) return
  setPriorityWrapper(stacks_wrapper)
})

_.on('click', editor_wrapper, (e) => {
  if (e.target.classList.contains('close-editor-wrapper')) return
  setPriorityWrapper(editor_wrapper)
})

_.on('click', download_form_btn, (e) => {
  e.preventDefault()
  const existed = _.getNode('.download-form')
  if (existed) {
    existed.remove()
  } else {
    _.appendChild(downloadForm())
  }
})
