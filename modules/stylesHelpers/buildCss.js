// { name : { general : { standard : { color : red }}}}

function extractMediaStyles(styles, classNames = '') {
  let generalStyles = ''
  let mediumStyles = ''
  let largeStyles = ''
  let prefix = classNames ? '.' : ''
  for (let owner in styles) {
    const ownerStyles = styles[owner]

    for (let media in ownerStyles) {
      let mediaStyleSet = ''
      const mediaStyles = ownerStyles[media]

      for (let condition in mediaStyles) {
        const conditionStyles = mediaStyles[condition]
        if (Object.keys(conditionStyles).length !== 0) {
          let conditionStyleSet = ''
          if (condition !== 'standard') {
            conditionStyleSet += `${prefix}${owner}:${condition} {`
          } else {
            conditionStyleSet += `${prefix}${owner} {`
          }
          for (let key in conditionStyles) {
            conditionStyleSet += `${key} : ${conditionStyles[key]};`
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

function convertToKeyFrames(animations) {
  let keyFrames = ''
  for (const animation in animations) {
    const animationData = animations[animation]
    let ani = `@keyframes ${animation} {`
    for (const kfs in animationData) {
      const kfsData = animationData[kfs]
      let kf = `${kfs}% {`
      for (const key in kfsData) {
        kf += `${key} : ${kfsData[key]};`
      }
      ani += `${kf}}`
    }
    keyFrames += `${ani}}`
  }
  return keyFrames
}

function convertToPredCss(styles) {
  // { h1 : { standard :{color : "red" }}, button : { hover :{ color : "green"}} }
  let css = ''
  for (let ele in styles) {
    const element = styles[ele]
    for (let condition in element) {
      if (condition === 'standard') {
        css += `#app ${ele} {`
      } else {
        css += `#app ${ele}:${condition} {`
      }
      const conditionStyles = element[condition]
      for (let key in conditionStyles) {
        css += `${key} : ${conditionStyles[key]};`
      }
      css += '}'
    }
  }
  return css
}

function buildCss(animations, predefined, classNames, customStyles) {
  const keyFrames = convertToKeyFrames(animations)
  const predefinedStyles = convertToPredCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] =
    extractMediaStyles(customStyles)
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = extractMediaStyles(
    classNames,
    '_'
  )
  return `${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} @media only screen and (min-width: 769px) and (max-width: 1024px){${cnMdStyles}${cusMdStyles}} @media only screen and (min-width: 1025px){${cnLgStyles}${cusLgStyles}}`
}

function convertToPredProductionCss(styles) {
  // { h1 : { standard : "red" }, button : { hover : "green"} }
  let css = ''
  for (let ele in styles) {
    const element = styles[ele]
    for (let condition in element) {
      if (condition === 'standard') {
        css += `${ele} {`
      } else {
        css += `${ele}:${condition} {`
      }
      const conditionStyles = element[condition]
      for (let key in conditionStyles) {
        css += `${key} : ${conditionStyles[key]};`
      }
      css += '}'
    }
  }
  return css
}

function buildProductionCss(animations, predefined, classNames, customStyles) {
  const keyFrames = convertToKeyFrames(animations)
  const predefinedStyles = convertToPredProductionCss(predefined)
  const [cusGrlStyles, cusMdStyles, cusLgStyles] =
    extractMediaStyles(customStyles)
  const [cnGrlStyles, cnMdStyles, cnLgStyles] = extractMediaStyles(
    classNames,
    '_'
  )
  return `${predefinedStyles}${keyFrames}${cnGrlStyles}${cusGrlStyles} @media only screen and (min-width: 769px) and (max-width: 1024px){${cnMdStyles}${cusMdStyles}} @media only screen and (min-width: 1025px){${cnLgStyles}${cusLgStyles}}`
}

export { buildCss, buildProductionCss }
