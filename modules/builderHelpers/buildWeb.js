import Document from '../dom/index.js'
import Random from '../random/index.js'
import { customStyles } from '../stylesHelpers/customStyles.js'
import { animations } from '../stylesHelpers/animations.js'
import { classNames } from '../stylesHelpers/classNameStyles .js'
import { predefinedStyles } from '../stylesHelpers/predefinedStyles.js'
import { buildProductionCss } from '../stylesHelpers/buildCss.js'

const _ = Document()
const random = Random()

function buildWeb(author, about, title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="created on playground" /><meta name="author" content="${author}"/><meta name="description" content="${about}" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
}

function buildWebProduction() {
  const app = _.getNodeById('app').cloneNode(true)

  const appWrapper = _.createElement('', '', [], [app])

  const lockedIds = []
  appWrapper.querySelectorAll('a').forEach((a) => {
    if (
      a.href.startsWith('https://sai-wunna.github.io/playground.github.io/')
    ) {
      // window.location.href
      lockedIds.push(a.href.split('.io/#')[1])
    }
  })

  const modifiedClassnames = {}
  for (const [cn, values] of Object.entries(classNames)) {
    const newCn = cn.slice(4)
    modifiedClassnames[newCn] = values
    appWrapper.querySelectorAll(`.${cn}`).forEach((node) => {
      node.classList.remove(cn)
      node.classList.add(newCn)
    })
  }

  const modifiedCustomStyles = {}
  for (const [id, values] of Object.entries(customStyles)) {
    const newCn = random.string()
    modifiedCustomStyles[newCn] = values
    appWrapper.querySelector(id).classList.add(newCn)
    if (!lockedIds.includes(id)) {
      appWrapper.querySelector(id).removeAttribute('id')
    }
  }

  appWrapper.querySelectorAll('[id]').forEach((ele) => {
    if (!lockedIds.includes(ele.id)) {
      ele.removeAttribute('id')
    }
  })

  const styles = buildProductionCss(
    animations,
    predefinedStyles,
    modifiedClassnames,
    modifiedCustomStyles
  )

  return { styles, app: app.outerHTML }
}

function downloadWeb(author, about, title) {
  const { styles, app } = buildWebProduction()
  const content = buildWeb(author, about, title, styles, app)

  const fileName = `web_${title.split(' ').join('_')}`

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

export default downloadWeb
