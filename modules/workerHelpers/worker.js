importScripts('./convertToCssString.js') // currently using only for css conversion

addEventListener('message', async (e) => {
  const { type, data, taskId } = e.data
  const result = { taskId }
  const returnData = {}
  if (data.animations) {
    returnData.animations = await convertToKeyFrames(data.animations)
  }

  if (data.predefinedStyles) {
    returnData.predefinedStyles = type
      ? await convertToPredProductionCss(data.predefinedStyles)
      : await convertToPredCss(data.predefinedStyles)
  }

  if (data.customStyles) {
    returnData.customStyles = await convertToCustomCss(
      data.customStyles,
      type || false
    )
  }

  if (data.classNames) {
    returnData.classNames = await convertToCNCss(data.classNames, type || false)
  }
  result.data = returnData
  postMessage(result)
})
