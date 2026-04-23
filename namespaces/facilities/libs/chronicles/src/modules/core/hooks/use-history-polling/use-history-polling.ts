import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import {
  NO_POLL_INTERVAL,
  DEFAULT_POLL_INTERVAL,
  DEFAULT_POLL_DURATION
} from './constants'

const useHistoryPolling = (
  pollInterval = DEFAULT_POLL_INTERVAL,
  pollDuration = DEFAULT_POLL_DURATION
): [number, () => void] => {
  const isMountedRef = useRef(false)
  const [activePollInterval, setActivePollInterval] = useState(NO_POLL_INTERVAL)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const scheduleCancelPolling = useDebouncedCallback(
    () => setActivePollInterval(NO_POLL_INTERVAL),
    pollDuration
  )

  const startPolling = useCallback(() => {
    if (isMountedRef.current) {
      setActivePollInterval(pollInterval)
      scheduleCancelPolling()
    }
  }, [scheduleCancelPolling, pollInterval])

  return [activePollInterval, startPolling]
}

export default useHistoryPolling
