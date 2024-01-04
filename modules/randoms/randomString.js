class URS {
  #alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  #numbers = '0123456789'
  #createdStrings

  constructor(exceptions = []) {
    this.#createdStrings = [...exceptions]
  }

  randomString(length = 5) {
    let str = ''

    const getString = () => {
      let string = ''
      for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
          string += this.#randomAlphaIdx()
        } else {
          string += this.#randomNumIdx()
        }
      }
      if (this.#createdStrings.includes(string)) {
        string[0] = this.#randomAlphaIdx()
        if (this.#createdStrings.includes(string)) {
          string = getString()
        }
      }
      return string
    }

    str = getString()
    this.#createdStrings.push(str)
    return str
  }

  #randomAlphaIdx() {
    const idx = parseInt(
      (Math.random() * (this.#alphabets.length - 1)).toFixed(0)
    )
    return this.#alphabets[idx]
  }

  #randomNumIdx() {
    const idx = parseInt((Math.random() * 9).toFixed(0))
    return this.#numbers[idx]
  }
  addNewAlphabets(alphabets) {
    this.#alphabets += [...alphabets].join('')
  }
}

function generateURS(ecp) {
  return new URS(ecp)
}

export default generateURS
