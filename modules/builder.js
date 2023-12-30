import {
  createButton,
  createElement,
  createInput,
  createLabel,
  getNode,
} from './dom/index.js'
import { animations } from './stylesHelpers/animations.js'
import { classNames } from './stylesHelpers/classNameStyles .js'
import { customStyles } from './stylesHelpers/customStyles.js'
import { buildProductionCss } from './stylesHelpers/buildCss.js'
import { predefinedStyles } from './stylesHelpers/predefinedStyles.js'

function buildWeb(title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><style>body {position: absolute !important;width: 100% !important;top: 0 !important;left: 0 !important;margin: 0 !important;z-index: 1 !important;box-sizing: border-box !important; scroll-behavior: smooth !important;}${styles}</style></head><body>${app}</body></html>`
}

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: 'text/html' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function downloadForm() {
  return createElement(
    'div',
    '',
    ['download-form'],
    [
      createButton('', ['btn', 'btn-close', 'float-end'], '', (e) =>
        e.target.parentElement.remove()
      ),
      createLabel('Title Of The Website', 'title_of_web', ['form-label']),
      createInput('', ['form-control', 'my-1'], 'title_of_web'),
      createButton('Download', ['btn', 'text-primary'], '', (e) => {
        const title = getNode('#title_of_web').value || 'Beautiful Day'
        const styles = buildProductionCss(
          animations,
          predefinedStyles,
          classNames,
          customStyles
        )
        const app = getNode('#app').outerHTML
        const file = buildWeb(title, styles, app)
        const fileName = `web_${title.split(' ').join('_')}`
        downloadFile(file, fileName)
      }),
    ]
  )
}

export { downloadForm }
