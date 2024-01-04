import Document from './dom/index.js'
import { generateURS } from './randoms/index.js'
import { animations } from './stylesHelpers/animations.js'
import { classNames } from './stylesHelpers/classNameStyles .js'
import { customStyles } from './stylesHelpers/customStyles.js'
import { buildProductionCss } from './stylesHelpers/buildCss.js'
import { predefinedStyles } from './stylesHelpers/predefinedStyles.js'

const _ = Document()
const URS = generateURS()

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

  let styles = buildProductionCss(
    animations,
    predefinedStyles,
    modifiedClassnames,
    customStyles
  )

  for (let id in customStyles) {
    const newId = URS.randomString()
    styles = styles.replace(id, `.${newId}`)
    appWrapper.querySelector(id).classList.add(newId)
    appWrapper.querySelector(id).removeAttribute('id')
  }

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
