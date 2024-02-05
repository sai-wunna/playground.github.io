import dom from '../dom/index.js'

const _ = dom()

const mediaQueries = {
  medium: { minWidth: 768, maxWidth: 1024 },
  large: { minWidth: 1025, maxWidth: 10000 },
}

function saveMediaQuery(media, minWidth, maxWidth) {
  mediaQueries[media] = { minWidth, maxWidth }
}

function createConfigureBox() {
  const minWidthLb = _.createLabel('At Min-width of', 'cf_media_min_w', [
    'form-label',
  ])
  const minWidthIp = _.createInput(
    'number',
    ['form-control'],
    'cf_media_min_w',
    { value: 768 }
  )
  const maxWidthLb = _.createLabel('At Max-width of', 'cf_media_max_w', [
    'form-label',
  ])
  const maxWidthIp = _.createInput(
    'number',
    ['form-control'],
    'cf_media_max_w',
    { value: 1024 }
  )
  const mediaQueriesLb = _.createLabel('Media-Queries', 'cf_media_queries', [
    'form-label',
  ])
  const mediaQueriesS = _.createSelect(
    ['form-control'],
    '',
    [
      { value: 'medium', text: 'Medium' },
      { value: 'large', text: 'Large' },
    ],
    'cf_media_queries',
    (e) => {
      const key = e.target.value
      minWidthIp.value = mediaQueries[key].minWidth
      maxWidthIp.value = mediaQueries[key].maxWidth
      if (key === 'medium') {
        maxWidthIp.disabled = false
      } else {
        maxWidthIp.disabled = true
      }
    }
  )
  const [saveBtn, saveBtnEvtCleaner] = _.createButton(
    'Save',
    ['btn', 'text-primary', 'm-1', 'float-end'],
    '',
    () => {
      saveMediaQuery(
        mediaQueriesS.value,
        parseInt(minWidthIp.value),
        parseInt(maxWidthIp.value)
      )
    },
    true
  )
  const box = _.createElement(
    '',
    '',
    ['styling-config-wrapper'],
    [
      mediaQueriesLb,
      mediaQueriesS,
      minWidthLb,
      minWidthIp,
      maxWidthLb,
      maxWidthIp,
      saveBtn,
    ]
  )
  return [box, saveBtnEvtCleaner]
}

export { mediaQueries, createConfigureBox }
