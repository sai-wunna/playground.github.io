class URC {
  baseColor
  opacity
  #createdColors = []
  constructor(baseColor = [200, 200, 200], opacity = 1) {
    this.baseColor = baseColor
    this.opacity = opacity
  }

  generate() {
    const get = () => {
      let randomColor = this.baseColor.map((baseCode) =>
        this.#randColorCode(baseCode)
      )
      if (this.#createdColors.includes(randomColor)) {
        randomColor[0] = this.#randColorCode(100)
        if (this.#createdColors.includes(randomColor)) {
          randomColor = get()
        }
      }
      return randomColor
    }

    let randColor = get()
    this.#createdColors.push(randColor)
    return `rgba(${randColor.join(', ')}, ${this.opacity})`
  }

  #randColorCode(baseCode) {
    const randomOffset = Math.floor(Math.random() * baseCode)
    return baseCode - randomOffset
  }

  addExceptions(ecp = []) {
    this.#createdColors = [...this.#createdColors, ...ecp]
  }
}

export default URC
