class URS {
  #alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  #created = []

  constructor(exceptions = []) {
    this.#created = [...exceptions]
  }

  generate(length = 5) {
    let str = ''

    const get = () => {
      let string = `${this.#randomAlphaIdx()}${Math.random()
        .toString(36)
        .substring(2, length + 1)}`

      if (this.#created.includes(string)) {
        string = this.#randomAlphaIdx() + string.slice(1)
        if (this.#created.includes(string)) {
          string = get()
        }
      }
      return string
    }

    str = get()
    this.#created.push(str)
    return str
  }

  #randomAlphaIdx() {
    const idx = parseInt(
      (Math.random() * (this.#alphabets.length - 1)).toFixed(0)
    )
    return this.#alphabets[idx]
  }

  addNewAlphabets(alphabets) {
    this.#alphabets += alphabets.trim()
  }

  addExceptions(ecp) {
    this.#created = [...this.#created, ...ecp]
  }
}

export default URS
