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

  isInvalidTextInput(target) {
    const val = this.#untie(target)
    return this.uwl.includes(val)
  }
  isInvalidInsert(target, ele) {
    if (target === '#app' && ele !== 'option') return false
    if (target.startsWith('#select') && ele === 'option') return false
    if (target === '#app' && ele === 'option') return true
    const val = this.#untie(target)
    return this.ual.includes(val)
  }
  isInvalidEleToShow(target) {
    const val = this.#untie(target)
    return ['option', 'br'].includes(val)
  }

  #untie(target) {
    return target.split('_')[0].slice(1)
  }
}

export default () => new Validator()
