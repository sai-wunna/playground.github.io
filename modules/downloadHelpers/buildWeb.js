'use strict'

import _ from '../dom/index.js'
import random from '../random/index.js'
import { customStyles } from '../stylesHelpers/customStyles.js'
import { animations } from '../stylesHelpers/animations.js'
import { classNames } from '../stylesHelpers/classNameStyles.js'
import { predefinedStyles } from '../stylesHelpers/predefinedStyles.js'
import startWorker from '../startWorker.js'
import { mediaQueries } from '../stylesHelpers/configStyling.js'

function buildWeb(author, about, title, styles, app) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="created on playground" /><meta name="author" content="${author}"/><meta name="description" content="${about}" /><title>${title}</title><style>${styles}</style></head><body>${app}</body></html>`
}

async function recreateStyles() {
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

  const styles = {
    animations,
    predefinedStyles,
    classNames: modifiedClassnames,
    customStyles: modifiedCustomStyles,
  }

  return { styles, app: app.outerHTML }
}

function buildStylesString(styles) {
  const {
    animations,
    predefinedStyles,
    customStyles: [cusGrlStyles, cusMdStyles, cusLgStyles],
    classNames: [cnGrlStyles, cnMdStyles, cnLgStyles],
  } = styles // destructure
  let stylesString = ''
  stylesString += `body{scroll-behavior : smooth;margin : 0;padding:0;box-sizing:border-box;overflow-x : hidden;}${predefinedStyles}${animations}${cnGrlStyles}${cusGrlStyles} `
  if (cnMdStyles.trim().length > 0 || cusMdStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.medium.minWidth}px) and (max-width: ${mediaQueries.medium.maxWidth}px){${cnMdStyles}${cusMdStyles}} `
  }
  if (cnLgStyles.trim().length > 0 || cusLgStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.large.minWidth}px){${cnLgStyles}${cusLgStyles}}`
  }
  return stylesString
}

function download(styles, app, author, about, title) {
  const stylesString = buildStylesString(styles)
  const content = buildWeb(author, about, title, stylesString, app)

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

async function downloadWeb(author, about, title) {
  const { styles, app } = await recreateStyles()
  startWorker('production', styles, (stylesStrings) =>
    download(stylesStrings, app, author, about, title)
  )
}

export default downloadWeb
