import random from './random/index.js'

let worker = createWorker()
const taskQueue = {}

function createWorker() {
  const newWorker = new Worker('./modules/workerHelpers/worker.js')

  newWorker.addEventListener('message', handleMessage)
  newWorker.addEventListener('error', handleError)

  return newWorker
}

function handleMessage(e) {
  if (!e.data) {
    throw new Error('Error')
  }
  const { data, taskId } = e.data
  const task = taskQueue[taskId]
  if (task) {
    task.callback(data)
    delete taskQueue[taskId]
  }
}

function handleError(error) {
  console.error('Worker error:', error)
  worker.terminate()
  worker = createWorker()
  for (const [taskId, { type, data, callback }] of Object.entries(taskQueue)) {
    startWorker(type, data, callback, taskId)
  }
}

function startWorker(type = '', data, callback, taskId = null) {
  const id = taskId || random.string()
  taskQueue[id] = { data, type, callback }
  worker.postMessage({ taskId: id, type, data })
}

export default startWorker
