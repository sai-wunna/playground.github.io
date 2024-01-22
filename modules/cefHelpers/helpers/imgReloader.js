'use strict'

function imgLoadError(e) {
  e.target.classList.add('img-load-error')
  e.target.style.cursor = 'pointer'
  e.target.alt =
    'Image loading error, make sure link is correct or click to reload'
}

function imgReload(e, src) {
  e.target.src = src
}

function imgLoaded(e, alt) {
  e.target.removeEventListener('error', imgLoadError)
  e.target.removeEventListener('click', imgReload)
  e.target.removeAttribute('style')
  e.target.classList.remove('img-load-error')
  e.target.alt = alt
}

function errImgReloader(img, src, alt) {
  img.addEventListener('error', (e) => imgLoadError(e))
  img.addEventListener('click', (e) => imgReload(e, src))
  img.addEventListener('load', (e) => imgLoaded(e, alt))
}

export default errImgReloader
