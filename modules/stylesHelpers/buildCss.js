'use strict'

// { name : { general : { standard : { color : red }}}}

function convertToKeyFrames(animations) {
  let keyFrames = ''
  for (const [name, kfs] of Object.entries(animations)) {
    let ani = `@keyframes ${name} {`
    for (const [keyFrame, values] of Object.entries(kfs)) {
      let kf = `${keyFrame}% {`
      for (const [key, value] of Object.entries(values)) {
        kf += `${key} : ${value};`
      }
      ani += `${kf}}`
    }
    keyFrames += `${ani}}`
  }
  return keyFrames
}

function extractMediaStyles(styles, classNames = '') {
  let generalStyles = ''
  let mediumStyles = ''
  let largeStyles = ''
  let prefix = classNames ? '.' : ''

  for (const [owner, ownerStyles] of Object.entries(styles)) {
    for (const [media, mediaStyles] of Object.entries(ownerStyles)) {
      let mediaStyleSet = ''

      for (const [condition, conditionStyles] of Object.entries(mediaStyles)) {
        if (Object.keys(conditionStyles).length !== 0) {
          let conditionStyleSet = ''
          if (condition !== 'standard') {
            conditionStyleSet += `${prefix}${owner}:${condition} {`
          } else {
            conditionStyleSet += `${prefix}${owner} {`
          }

          for (const [key, value] of Object.entries(conditionStyles)) {
            conditionStyleSet += `${key} : ${value};`
          }

          mediaStyleSet += `${conditionStyleSet}}`
        }
      }

      if (media === 'general') {
        generalStyles += mediaStyleSet
      } else if (media === 'medium') {
        mediumStyles += mediaStyleSet
      } else {
        largeStyles += mediaStyleSet
      }
    }
  }

  return [generalStyles, mediumStyles, largeStyles]
}

function convertToPredCss(styles) {
  let css = ''

  for (const [element, conditions] of Object.entries(styles)) {
    const selector =
      element === 'all' ? '#app_wrapper *' : `#app_wrapper ${element}`

    for (const [condition, conditionStyles] of Object.entries(conditions)) {
      css += `${selector}${condition === 'standard' ? '' : `:${condition}`} {`

      for (const [key, value] of Object.entries(conditionStyles)) {
        css += `${key} : ${value};`
      }

      css += '}'
    }
  }

  return css
}

function buildCss(animations, predefined, classNames, customStyles) {
  let stylesString = ''
  const keyFrames = convertToKeyFrames(animations)
  const predefinedStyles = convertToPredCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] =
    extractMediaStyles(customStyles)
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = extractMediaStyles(
    classNames,
    '_'
  )
  stylesString += `${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} `
  if (cnMdStyles.trim().length > 0 || cusMdStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: 769px) and (max-width: 1024px){${cnMdStyles}${cusMdStyles}} `
  }
  if (cnLgStyles.trim().length > 0 || cusLgStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: 1025px){${cnLgStyles}${cusLgStyles}}`
  }
  return stylesString
}

function convertToPredProductionCss(styles) {
  let css = ''

  for (const [element, conditions] of Object.entries(styles)) {
    const selector = element === 'all' ? 'body *' : element

    for (const [condition, conditionStyles] of Object.entries(conditions)) {
      css += `${selector}${condition === 'standard' ? '' : `:${condition}`} {`

      for (const [key, value] of Object.entries(conditionStyles)) {
        css += `${key} : ${value};`
      }

      css += '}'
    }
  }

  return css
}

function buildProductionCss(animations, predefined, classNames, customStyles) {
  let stylesString = ''
  const keyFrames = convertToKeyFrames(animations)
  const predefinedStyles = convertToPredProductionCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] = extractMediaStyles(
    customStyles,
    '_'
  )
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = extractMediaStyles(
    classNames,
    '_'
  )
  stylesString += `body{scroll-behavior : smooth;margin : 0;padding:0;box-sizing:border-box;overflow-x : hidden;}${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} `
  if (cnMdStyles.trim().length > 0 || cusMdStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: 769px) and (max-width: 1024px){${cnMdStyles}${cusMdStyles}} `
  }
  if (cnLgStyles.trim().length > 0 || cusLgStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: 1025px){${cnLgStyles}${cusLgStyles}}`
  }
  return stylesString
}

export { buildCss, buildProductionCss }
