class URC {
  #baseColor
  #opacity
  #createdColors = []
  constructor(baseColor = [200, 200, 200], opacity = 1) {
    this.#baseColor = baseColor
    this.#opacity = opacity
  }

  generate() {
    const get = () => {
      let randomColor = this.#baseColor.map((channel) => {
        const randomOffset = Math.floor(Math.random() * channel)
        return channel - randomOffset
      })
      if (this.#createdColors.includes(randomColor)) {
        randomColor = get()
      }
      return randomColor
    }

    let randColor = get()
    return `rgba(${randColor.join(', ')}, ${this.#opacity})`
  }
}

function generateURC(baseColor, opacity) {
  return new URC(baseColor, opacity)
}

export default generateURC
