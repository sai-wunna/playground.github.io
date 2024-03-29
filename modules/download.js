'use strict'

import _ from './dom/index.js'
import notifier from './notify.js'
import downloadJSON from './downloadHelpers/buildJSON.js'
import downloadWeb from './downloadHelpers/buildWeb.js'

function downloadForm() {
  const fileType = _.createSelect(['save-file-type'], '', [
    { value: 'web', text: 'Website', selected: true },
    { value: 'json', text: 'JSON' },
  ])

  const titleIp = _.createInput('', ['form-control', 'my-1'], 'title_of_web', {
    value: 'Beautiful Day',
  })
  const authorIp = _.createInput(
    '',
    ['form-control', 'my-1'],
    'author_of_web',
    {
      value: 'Anonymous',
    }
  )
  const aboutIp = _.createInput('', ['form-control', 'my-1'], 'about_of_web', {
    value: 'Something beautiful has been born here',
  })
  const [downLoadBtn, cleanUpDLListener] = _.createButton(
    'Download',
    ['btn', 'text-primary'],
    '',
    async (e) => {
      e.preventDefault()
      notifier.__start('Building . . .')
      const title = titleIp.value || 'Beautiful Day'
      const author = authorIp.value || 'Anonymous'
      const about = aboutIp.value || 'something beautiful has been born here'
      if (fileType.value === 'web') {
        await downloadWeb(author, about, title)
      } else {
        await downloadJSON(author, about, title)
      }
      notifier.__end('* Download in progress *')
    },
    true
  )
  const form = _.createElement(
    'div',
    '',
    ['download-form'],
    [
      _.createLabel('Title Of The Website', 'title_of_web', ['form-label']),
      titleIp,
      _.createLabel('Something about Your Website', 'about_of_web', [
        'form-label',
      ]),
      aboutIp,
      _.createLabel('Your Name ( as author )', 'author_of_web', ['form-label']),
      authorIp,
      _.createElement(
        '',
        '',
        ['d-flex', 'justify-content-between', 'align-items-center'],
        [downLoadBtn, fileType]
      ),
    ]
  )
  return [form, cleanUpDLListener]
}

export default downloadForm
