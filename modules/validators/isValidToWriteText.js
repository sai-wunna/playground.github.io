const invalidList = [
  'selection',
  'thead',
  'tfoot',
  'tbody',
  'tr',
  'input',
  'hr',
  'br',
]

function isInvalidTextInput(ele) {
  const value = ele.split('_')[0].slice(1)
  return invalidList.includes(value)
}

export { isInvalidTextInput }
