addEventListener('message', (e) => {
  let result = null
  const { type, data } = e.data
  if (type === 'plus') {
    result = data + 1
  } else {
    result = data - 1
  }
  postMessage(result)
})
