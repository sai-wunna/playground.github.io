import Document from './dom/index.js'
import Random from './random/index.js'
import { animations } from './stylesHelpers/animations.js'
import { classNames } from './stylesHelpers/classNameStyles .js'
import { customStyles } from './stylesHelpers/customStyles.js'
import { buildProductionCss } from './stylesHelpers/buildCss.js'
import { predefinedStyles } from './stylesHelpers/predefinedStyles.js'

const _ = Document()
const random = Random()

function buildWeb(title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
}

function prepareProduction() {
  const app = _.getNode('#app').cloneNode(true)

  const appWrapper = _.createElement('', '', [], [app])

  const modifiedClassnames = {}
  for (let cn in classNames) {
    const newCn = cn.slice(4)
    modifiedClassnames[newCn] = classNames[cn]
    appWrapper.querySelectorAll(`.${cn}`).forEach((node) => {
      node.classList.remove(cn)
      node.classList.add(newCn)
    })
  }

  const modifiedCustomStyles = {}
  for (let id in customStyles) {
    const newCn = random.string()
    modifiedCustomStyles[newCn] = customStyles[id]
    appWrapper.querySelector(id).classList.add(newCn)
    appWrapper.querySelector(id).removeAttribute('id')
  }

  let styles = buildProductionCss(
    animations,
    predefinedStyles,
    modifiedClassnames,
    modifiedCustomStyles
  )

  return { styles, app: app.outerHTML }
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
        const { styles, app } = prepareProduction()
        const file = buildWeb(title, styles, app)
        const fileName = `web_${title.split(' ').join('_')}`
        downloadFile(file, fileName)
      }),
    ]
  )
}

export { downloadForm }
