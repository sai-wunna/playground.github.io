'use strict'

// iti = invalidTextInputList / ual => unAppend-ableList
class Validator {
  iti = [
    'selection',
    'table',
    'thead',
    'tfoot',
    'tbody',
    'tr',
    'input',
    'hr',
    'br',
  ]
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
    'button',
  ]

  isInvalidTextInput(target) {
    const val = this.#untie(target)
    return this.iti.includes(val)
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
  isInvalidInsertFile(data) {
    // roughly
    if (!(data.tree && data.styles && data.info)) {
      return true
    }

    const { tree, styles } = data
    if (
      !(
        tree.attrs.id === 'app' &&
        styles.classNames &&
        styles.customStyles &&
        styles.animations &&
        styles.predefinedStyles
      )
    ) {
      return true
    }

    return false
  }

  #untie(target) {
    return target.split('_')[0].slice(1)
  }
}

export default new Validator()
