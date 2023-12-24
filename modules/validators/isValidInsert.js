const banList = [
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

function isInvalidInsert(ele) {
  if (ele === '#app') return false
  const value = ele.split('_')[0].slice(1)
  return banList.includes(value)
}

export { isInvalidInsert }
