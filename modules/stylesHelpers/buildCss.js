'use strict'

import { mediaQueries } from './configStyling.js'

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

function convertToCustomCss(styles, production = '') {
  let generalStyles = ''
  let mediumStyles = ''
  let largeStyles = ''
  const prefix = production ? '.' : ''

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

function convertToCNCss(classNames, production = '') {
  let generalStyles = ''
  let mediumStyles = ''
  let largeStyles = ''

  for (const [cn, properties] of Object.entries(classNames)) {
    for (const [media, mediaStyles] of Object.entries(properties)) {
      let mediaStyleString = ''
      for (const [condition, conditionDetail] of Object.entries(mediaStyles)) {
        let conditionStyleString = ''
        if (condition === 'standard') {
          // set data if only there is
          if (Object.keys(conditionDetail).length > 0) {
            conditionStyleString += `.${cn} {`
            for (const [key, value] of Object.entries(conditionDetail)) {
              conditionStyleString += `${key} : ${value};`
            }
            mediaStyleString += `${conditionStyleString}}`
          }
        } else {
          // pseudo-classes
          const { self: selfStyles, consumers } = conditionDetail
          // add if self pseudo effects are there
          if (Object.keys(selfStyles).length > 0) {
            let selfStyleString = `.${cn}:${condition} {`
            for (const [key, value] of Object.entries(selfStyles)) {
              selfStyleString += `${key}:${value};`
            }
            conditionStyleString += `${selfStyleString}}`
          }
          // add other effects
          for (const { consumer, styles: consumingStyles } of consumers) {
            // check there is valid data
            if (Object.keys(consumingStyles).length < 1) continue

            const combinator = consumer[0]
            const interceptor = consumer.slice(1)
            let consumerStyleString = `.${cn}:${condition} ${combinator} .${
              production ? interceptor.slice(4) : interceptor
            } {`

            for (const [key, value] of Object.entries(consumingStyles)) {
              consumerStyleString += `${key}:${value};`
            }

            conditionStyleString += `${consumerStyleString}}`
          }
          mediaStyleString += `${conditionStyleString}`
        }
      }
      if (media === 'general') {
        generalStyles += mediaStyleString
      } else if (media === 'medium') {
        mediumStyles += mediaStyleString
      } else {
        largeStyles += mediaStyleString
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

async function buildCss(animations, predefined, classNames, customStyles) {
  let stylesString = ''
  const keyFrames = await convertToKeyFrames(animations)
  const predefinedStyles = await convertToPredCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] = await convertToCustomCss(
    customStyles
  )
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = await convertToCNCss(classNames)
  stylesString += `${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} `
  if (cnMdStyles.trim().length > 0 || cusMdStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.medium.minWidth}px) and (max-width: ${mediaQueries.medium.maxWidth}px){${cnMdStyles}${cusMdStyles}} `
  }
  if (cnLgStyles.trim().length > 0 || cusLgStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.large.minWidth}px){${cnLgStyles}${cusLgStyles}}`
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

async function buildProductionCss(
  animations,
  predefined,
  classNames,
  customStyles
) {
  let stylesString = ''
  const keyFrames = await convertToKeyFrames(animations)
  const predefinedStyles = await convertToPredProductionCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] = await convertToCustomCss(
    customStyles,
    '_'
  )
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = await convertToCNCss(
    classNames,
    '_'
  )
  stylesString += `body{scroll-behavior : smooth;margin : 0;padding:0;box-sizing:border-box;overflow-x : hidden;}${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} `
  if (cnMdStyles.trim().length > 0 || cusMdStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.medium.minWidth}px) and (max-width: ${mediaQueries.medium.maxWidth}px){${cnMdStyles}${cusMdStyles}} `
  }
  if (cnLgStyles.trim().length > 0 || cusLgStyles.trim().length > 0) {
    stylesString += `@media only screen and (min-width: ${mediaQueries.large.minWidth}px){${cnLgStyles}${cusLgStyles}}`
  }
  return stylesString
}

export { buildCss, buildProductionCss }
