import { useCallback, useState, useRef } from 'react'
import { usePrevious } from '@staff-portal/utils'
import {
  DocumentNode,
  NetworkStatus,
  OperationVariables,
  TypedDocumentNode
} from '@apollo/client'

import { LazyQueryHookOptions, useLazyQuery } from '../use-lazy-query'

const ASYNC_FIELD_POLL_INTERVAL = 5000
const ASYNC_FIELD_MAX_ATTEMPTS = 3

export const useFieldPollingUpdate = <
  TData = object,
  TVariables = OperationVariables
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  {
    variables,
    pollInterval = ASYNC_FIELD_POLL_INTERVAL,
    maxAttempts = ASYNC_FIELD_MAX_ATTEMPTS
  }: {
    variables: LazyQueryHookOptions<TData, TVariables>['variables']
    pollInterval?: number
    maxAttempts?: number
  }
) => {
  const [request, { data, previousData, stopPolling, networkStatus }] =
    useLazyQuery(query, {
      variables,
      pollInterval,
      notifyOnNetworkStatusChange: true
    })

  const attemptsCounterRef = useRef(1)
  const timerRef = useRef<number>()
  const [polling, setPolling] = useState(false)

  const previousNetworkStatus = usePrevious(networkStatus)

  if (
    previousNetworkStatus === NetworkStatus.ready &&
    networkStatus === NetworkStatus.poll
  ) {
    attemptsCounterRef.current += 1
  }

  const startPollingCustom = useCallback(() => {
    clearTimeout(timerRef.current)

    timerRef.current = setTimeout(request, pollInterval) as unknown as number
    setPolling(true)
  }, [pollInterval, request])

  const isDataUpdated =
    polling && previousData !== undefined && data !== previousData
  const isAttemptsLimitReached =
    networkStatus === NetworkStatus.ready &&
    attemptsCounterRef.current === maxAttempts

  if (isDataUpdated || isAttemptsLimitReached) {
    stopPolling?.()
    setPolling(false)
    attemptsCounterRef.current = 1
    timerRef.current = undefined
  }

  return { startPolling: startPollingCustom, stopPolling, polling }
}
