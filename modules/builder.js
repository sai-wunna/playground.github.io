import {
  createButton,
  createElement,
  createInput,
  createLabel,
  getNode,
} from './dom/dom.js'
import { animations } from './stylesHelpers/animationStore.js'
import { stylesForGrlScreen } from './stylesHelpers/appliedGrlScreenStyles.js'
import { stylesForLgScreen } from './stylesHelpers/appliedLgScreenStyles.js'
import { stylesForMdScreen } from './stylesHelpers/appliedMdScreenStyles.js'
import { buildCss } from './stylesHelpers/helpers/buildCss.js'

function buildWeb(title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
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
        const styles = buildCss(
          animations,
          stylesForGrlScreen,
          stylesForMdScreen,
          stylesForLgScreen
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
