function isInvalidEleToShow(ele) {
  const value = ele.split('_')[0].slice(1)
  return ['option', 'br'].includes(value)
}

export { isInvalidEleToShow }
