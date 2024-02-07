function handleWorker(type, data) {
  const worker = new Worker('./modules/workerHelper/worker.js')
  worker.postMessage({ type, data })
  worker.addEventListener('message', (e) => {
    worker.terminate()
    console.log(e.data)
  })

  worker.addEventListener('error', (err) => {
    worker.terminate()
    console.log(err)
  })
}

export default handleWorker
