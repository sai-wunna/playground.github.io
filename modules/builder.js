import Document from './dom/index.js'
import { animations } from './stylesHelpers/animations.js'
import { classNames } from './stylesHelpers/classNameStyles .js'
import { customStyles } from './stylesHelpers/customStyles.js'
import { buildProductionCss } from './stylesHelpers/buildCss.js'
import { predefinedStyles } from './stylesHelpers/predefinedStyles.js'

const _ = Document()

function buildWeb(title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
}

function rebuildClassNames() {
  const app = _.getNode('#app').cloneNode(true)
  const fakeDoc = _.createElement('', '', [], [app])
  const modifiedClassnames = {}
  for (let cn in classNames) {
    const newCn = cn.slice(4)
    modifiedClassnames[newCn] = classNames[cn]
    fakeDoc.querySelectorAll(`.${cn}`).forEach((node) => {
      node.classList.remove(cn)
      node.classList.add(newCn)
    })
  }

  return { modifiedClassnames, app }
}

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: 'text/html' })
  const link = _.createAnchor(
    'link',
    '',
    URL.createObjectURL(blob),
    '',
    '',
    '',
    fileName
  )
  link.download = fileName
  _.appendChild(link)
  link.click()
  _.removeChild(link)
}

function downloadForm() {
  return _.createElement(
    'div',
    '',
    ['download-form'],
    [
      _.createButton('', ['btn', 'btn-close', 'float-end'], '', (e) =>
        e.target.parentElement.remove()
      ),
      _.createLabel('Title Of The Website', 'title_of_web', ['form-label']),
      _.createInput('', ['form-control', 'my-1'], 'title_of_web', {
        value: 'Beautiful Day',
      }),
      _.createButton('Download', ['btn', 'text-primary'], '', (e) => {
        const title = _.getNode('#title_of_web').value || 'Beautiful Day'
        const { modifiedClassnames, app } = rebuildClassNames()
        const modifiedApp = app.outerHTML
        const styles = buildProductionCss(
          animations,
          predefinedStyles,
          modifiedClassnames,
          customStyles
        )
        const file = buildWeb(title, styles, modifiedApp)
        const fileName = `web_${title.split(' ').join('_')}`
        downloadFile(file, fileName)
      }),
    ]
  )
}

export { downloadForm }
