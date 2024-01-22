'use strict'

import Document from './dom/index.js'
import Alert from './alert.js'
import downloadJSON from './builderHelpers/buildJSON.js'
import downloadWeb from './builderHelpers/buildWeb.js'

const _ = Document()
const alert = Alert(_)

// download form -------------

const fileType = _.createSelect(['save-file-type'], '', [
  { value: 'web', text: 'Website', selected: true },
  { value: 'json', text: 'JSON' },
])

const titleIp = _.createInput('', ['form-control', 'my-1'], 'title_of_web', {
  value: 'Beautiful Day',
})
const authorIp = _.createInput('', ['form-control', 'my-1'], 'author_of_web', {
  value: 'Anonymous',
})
const aboutIp = _.createInput('', ['form-control', 'my-1'], 'about_of_web', {
  value: 'Something beautiful has been born here',
})

function downloadForm() {
  return _.createElement(
    'div',
    '',
    ['download-form'],
    [
      _.createButton('', ['btn', 'btn-close', 'float-end'], '', (e) =>
        e.target.parentElement.remove()
      ),
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
        [
          _.createButton('Download', ['btn', 'text-primary'], '', (e) => {
            e.preventDefault()
            alert.__start('Building . . .')
            const title = titleIp.value || 'Beautiful Day'
            const author = authorIp.value || 'Anonymous'
            const about =
              aboutIp.value || 'something beautiful has been born here'
            if (fileType.value === 'web') {
              downloadWeb(author, about, title)
            } else {
              downloadJSON(author, about, title)
            }
            alert.__end('* Download in progress *')
          }),
          fileType,
        ]
      ),
    ]
  )
}

export { downloadForm }
