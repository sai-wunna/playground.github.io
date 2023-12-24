function convertToCSS(styles) {
  const states = ['standard', 'hover', 'active', 'focus']
  let string = ''
  for (let node in styles) {
    const nodeStyles = { ...styles[node] }
    states.forEach((state) => {
      if (Object.keys(nodeStyles[state]).length === 0) return
      let values = ''
      let valueSet = nodeStyles[state]
      for (let value in valueSet) {
        values += `${value.toString()}:${valueSet[value].toString()};`
      }
      if (state !== 'standard') {
        string += `${node.toString()}:${state}{${values}}`
      } else {
        string += `${node.toString()}{${values}}`
      }
    })
  }
  return string
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
        kf += `${key} : ${kfsData[key]}`
      }
      ani += `${kf}}`
    }
    keyFrames += `${ani}}`
  }
  return keyFrames
}

function buildCss(animations, general, md, lg) {
  const keyFrames = convertToKeyFrames(animations)
  const stylesForGrl = convertToCSS(general)
  const stylesForMd = convertToCSS(md)
  const stylesForLg = convertToCSS(lg)
  return `${keyFrames}${stylesForGrl} @media only screen and (min-width: 769px) and (max-width: 1024px){${stylesForMd}} @media only screen and (min-width: 1025px){${stylesForLg}}`
}

export { buildCss }
