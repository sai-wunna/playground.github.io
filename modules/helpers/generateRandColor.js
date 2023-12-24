function generateRandomColor() {
  const baseColor = [231, 231, 193]
  const darkeningFactor = 0.6
  const randomColor = baseColor.map((channel) => {
    const randomOffset = Math.floor(Math.random() * darkeningFactor * channel)
    return channel - randomOffset
  })

  return `rgb(${randomColor.join(', ')})`
}

export { generateRandomColor }
