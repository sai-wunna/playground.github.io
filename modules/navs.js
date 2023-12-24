import { appendChild, getNode, on } from './dom/dom.js'
import { closeNav, openNav } from './helpers/navAnimator.js'
import { lockBtn } from './helpers/lockBtn.js'
import { downloadForm } from './builder.js'

const element_create_wrapper = getNode('.create-element-form-wrapper')
const elements_opener_btn = getNode('.elements_opener')
const eWCloseBtn = getNode('.close-create-elements-wrapper')

const style_tools_wrapper = getNode('.styler-tools-wrapper')
const tools_opener_btn = getNode('.tools_opener')
const tWCloseBtn = getNode('.close-tools-wrapper')

const stacks_wrapper = getNode('.element-stacks-wrapper')
const stacks_opener_btn = getNode('.stacks_opener')
const sWCloseBtn = getNode('.close-stacks-wrapper')

const editor_wrapper = getNode('.editor-wrapper')
const editor_opener_btn = getNode('.editor_opener')
const editorCloseBtn = getNode('.close-editor-wrapper')

const clearViewBtn = getNode('.clean-view')
let openedModals = []

on('click', elements_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(elements_opener_btn)
  if (element_create_wrapper.classList.contains('open-ele-wrapper')) {
    closeNav(element_create_wrapper, 'open-ele-wrapper')
  } else {
    openNav(element_create_wrapper, 'open-ele-wrapper')
  }
})
on('click', eWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(element_create_wrapper, 'open-ele-wrapper')
})

on('click', tools_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(tools_opener_btn)
  if (style_tools_wrapper.classList.contains('open-tools-wrapper')) {
    closeNav(style_tools_wrapper, 'open-tools-wrapper')
  } else {
    openNav(style_tools_wrapper, 'open-tools-wrapper')
  }
})
on('click', tWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(style_tools_wrapper, 'open-tools-wrapper')
})

on('click', stacks_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(stacks_opener_btn)
  if (stacks_wrapper.classList.contains('open-stacks-wrapper')) {
    closeNav(stacks_wrapper, 'open-stacks-wrapper')
  } else {
    openNav(stacks_wrapper, 'open-stacks-wrapper')
  }
})
on('click', sWCloseBtn, (e) => {
  e.preventDefault()
  closeNav(stacks_wrapper, 'open-stacks-wrapper')
})

on('click', editor_opener_btn, (e) => {
  e.preventDefault()
  lockBtn(editor_opener_btn)
  if (editor_wrapper.classList.contains('open-editor-wrapper')) {
    closeNav(editor_wrapper, 'open-editor-wrapper')
  } else {
    openNav(editor_wrapper, 'open-editor-wrapper')
  }
})
on('click', editorCloseBtn, (e) => {
  e.preventDefault()
  closeNav(editor_wrapper, 'open-editor-wrapper')
})

function setPriorityWrapper(wp) {
  if (wp.classList.contains('priority-wrapper-box')) return
  getNode('.priority-wrapper-box')?.classList.remove('priority-wrapper-box')
  wp.classList.add('priority-wrapper-box')
}

on('click', element_create_wrapper, (e) => {
  if (e.target.classList.contains('close-create-elements-wrapper')) return
  setPriorityWrapper(element_create_wrapper)
})

on('click', style_tools_wrapper, (e) => {
  if (e.target.classList.contains('close-tools-wrapper')) return
  setPriorityWrapper(style_tools_wrapper)
})

on('click', stacks_wrapper, (e) => {
  if (e.target.classList.contains('close-stacks-wrapper')) return
  setPriorityWrapper(stacks_wrapper)
})

on('click', editor_wrapper, (e) => {
  if (e.target.classList.contains('close-editor-wrapper')) return
  setPriorityWrapper(editor_wrapper)
})

on('mouseover', clearViewBtn, (e) => {
  e.preventDefault()
  if (element_create_wrapper.classList.contains('open-ele-wrapper')) {
    openedModals.push('.create-element-form-wrapper')
    element_create_wrapper.style.display = 'none'
  }
  if (style_tools_wrapper.classList.contains('open-tools-wrapper')) {
    openedModals.push('.styler-tools-wrapper')
    style_tools_wrapper.style.display = 'none'
  }
  if (stacks_wrapper.classList.contains('open-stacks-wrapper')) {
    openedModals.push('.element-stacks-wrapper')
    stacks_wrapper.style.display = 'none'
  }
  if (editor_wrapper.classList.contains('open-editor-wrapper')) {
    openedModals.push('.editor-wrapper')
    editor_wrapper.style.display = 'none'
  }
})

on('click', clearViewBtn, (e) => {
  e.preventDefault()
  const existed = getNode('.download-form')
  if (existed) {
    existed.remove()
  } else {
    appendChild(downloadForm())
  }
})

on('mouseout', clearViewBtn, (e) => {
  e.preventDefault()
  openedModals.forEach((modal) => {
    getNode(modal).style.display = 'block'
  })
  openedModals = []
})
