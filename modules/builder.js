import Document from './dom/index.js'
import Random from './random/index.js'
import Alert from './alert.js'
import { animations } from './stylesHelpers/animations.js'
import { classNames } from './stylesHelpers/classNameStyles .js'
import { customStyles } from './stylesHelpers/customStyles.js'
import { predefinedStyles } from './stylesHelpers/predefinedStyles.js'
import { buildProductionCss } from './stylesHelpers/buildCss.js'

const _ = Document()
const random = Random()
const alert = Alert()

function buildWeb(author, about, title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="created on playground" /><meta name="author" content="${author}"/><meta name="description" content="${about}" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
}

function buildProduction() {
  const app = _.getNodeById('app').cloneNode(true)

  const appWrapper = _.createElement('', '', [], [app])

  const lockedIds = []
  appWrapper.querySelectorAll('a').forEach((a) => {
    if (
      a.href.startsWith('https://sai-wunna.github.io/playground.github.io/')
    ) {
      lockedIds.push(a.href.split('.io/')[2])
      console.log(lockedIds)
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
      console.log(id)
      appWrapper.querySelector(id).removeAttribute('id')
    }
  }

  appWrapper.querySelectorAll('[id]').forEach((ele) => {
    if (!lockedIds.includes(ele.id)) {
      console.log(ele)
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
      _.createLabel('Something about Your Website', 'about_of_web', [
        'form-label',
      ]),
      _.createInput('', ['form-control', 'my-1'], 'about_of_web', {
        value: 'Something beautiful has been born here',
      }),
      _.createLabel('Your Name ( as author )', 'author_of_web', ['form-label']),
      _.createInput('', ['form-control', 'my-1'], 'author_of_web', {
        value: 'Anonymous',
      }),
      _.createButton('Download', ['btn', 'text-primary'], '', (e) => {
        alert.__start('Building . . .')
        const title = _.getNodeById('title_of_web').value || 'Beautiful Day'
        const author = _.getNodeById('author_of_web').value || 'Anonymous'
        const about =
          _.getNodeById('about_of_web').value ||
          'something beautiful has been born here'
        const { styles, app } = buildProduction()
        const file = buildWeb(author, about, title, styles, app)
        const fileName = `web_${title.split(' ').join('_')}`
        downloadFile(file, fileName)
        alert.__end('* Download in progress *')
      }),
    ]
  )
}

export { downloadForm }
