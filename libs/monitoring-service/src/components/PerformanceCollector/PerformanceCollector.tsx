import React, { Profiler } from 'react'
import { useLocation } from '@staff-portal/navigation'

import { useMemoryStatus } from './hooks/use-memory-status'
import { useNetworkStatus } from './hooks/use-network-status'
import { useHardwareConcurrency } from './hooks/use-hardware-concurrency'
import { processProfilerEvent } from './lib/performance-buffer-handler'

const PerformanceCollector = ({
  id,
  title,
  children
}: {
  id: string
  title: string
  children: React.ReactNode
}) => {
  const location = useLocation()
  const { effectiveConnectionType: connectionType } = useNetworkStatus()
  const { numberOfLogicalProcessors } = useHardwareConcurrency()
  const { deviceMemory } = useMemoryStatus()

  return (
    <Profiler
      id={id}
      onRender={(
        _,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
        // eslint-disable-next-line max-params
      ) =>
        processProfilerEvent({
          key: location.pathname + location.search + location.hash,
          title,
          location,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
          connectionType,
          numberOfLogicalProcessors,
          deviceMemory
        })
      }
    >
      {children}
    </Profiler>
  )
}

const PerformanceCollectorProxy = ({
  id,
  title,
  shouldTrackData,
  children
}: {
  id: string
  title: string
  shouldTrackData: boolean
  children?: React.ReactNode
}) =>
  shouldTrackData ? (
    <PerformanceCollector {...{ id, title, children }} />
  ) : (
    <>{children}</>
  )

export default PerformanceCollectorProxy
