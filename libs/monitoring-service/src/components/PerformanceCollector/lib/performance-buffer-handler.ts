/* eslint-disable no-console */
import { useLocation } from '@staff-portal/navigation'

import { first, get, last, pipe } from '../../../utils/fp'

type ProfilerEvent = {
  key: string
  title?: string
  location: ReturnType<typeof useLocation>
  phase: 'update' | 'mount'
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
  connectionType: string | null
  numberOfLogicalProcessors: number | undefined
  deviceMemory: number | null | undefined
}

const measuredRoutes: string[] = []
let queue: ProfilerEvent[] = []
let processQueueTimeout: ReturnType<typeof setTimeout>

const key = get('key')
const lastKey = pipe(last, key)
const route = pipe(last, get('location'))
const totalStart = pipe(first, get('startTime'))
const totalCommit = pipe(last, get('commitTime'))
const connectionType = pipe(last, get('connectionType'))
const numberOfLogicalProcessors = pipe(last, get('numberOfLogicalProcessors'))
const deviceMemory = pipe(last, get('deviceMemory'))

export const processProfilerEvent = (event: ProfilerEvent) => {
  if (measuredRoutes.indexOf(key(event) as string) !== -1) {
    return
  }

  clearTimeout(processQueueTimeout)
  if (queue.length === 0 || key(event) === lastKey(queue)) {
    queue.push(event)
    processQueueTimeout = setTimeout(sendProfileQueue, 10000)
  } else {
    measuredRoutes.push(lastKey(queue).toString())
    sendProfileQueue()
    queue.push(event)
  }
}

const sendProfileQueue = () => {
  // don't break the application if metrics fails
  try {
    const renderCycles = queue.length
    const renderingTime: number = queue
      .map(({ actualDuration }) => Math.round(actualDuration))
      .reduce((acc: number, item: number) => acc + item, 0)
    const totalTime = Number(totalCommit(queue)) - Number(totalStart(queue))
    const apiFetchingTime = totalTime - renderingTime
    const currentConnectionType = connectionType(queue)
    const currentNumberOfLogicalProcessors = numberOfLogicalProcessors(queue)
    const currentDeviceMemory = deviceMemory(queue)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { pathname, search, hash } = route(queue) as any
    const pageMetrics = {
      key: lastKey(queue),
      route: pathname + search + hash,
      renderCycles,
      totalTime,
      renderingTime,
      apiFetchingTime,
      connectionType: currentConnectionType,
      numberOfLogicalProcessors: currentNumberOfLogicalProcessors,
      deviceMemory: currentDeviceMemory
    }

    queue = [] // cleanup buffer

    // skip results that seems to be faulty (total time is less than 75 ms)
    if (totalTime < 75) {
      return
    }

    console.log('Page Performance Metrics', pageMetrics)
  } catch (e) {
    // report errors in development more
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  }
}
