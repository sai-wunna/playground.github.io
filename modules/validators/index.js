// uwl = unWritableList / ual => unAppend-ableList
class Validator {
  uwl = ['selection', 'thead', 'tfoot', 'tbody', 'tr', 'input', 'hr', 'br']
  ual = [
    'img',
    'input',
    'br',
    'hr',
    'selection',
    'option',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'th',
    'tf',
    'tr',
    'td',
    'caption',
    'audio',
  ]

  isInvalidTextInput(ele) {
    const val = this.#untie(ele)
    return this.uwl.includes(val)
  }
  isInvalidInsert(ele) {
    if (ele === '#app') return false
    const val = this.#untie(ele)
    return this.ual.includes(val)
  }
  isInvalidEleToShow(ele) {
    const val = this.#untie(ele)
    return ['option', 'br'].includes(val)
  }

  #untie(ele) {
    return ele.split('_')[0].slice(1)
  }
}

export default () => new Validator()
