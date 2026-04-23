import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import deepEqual from 'deep-equal'
import { useHistory, useLocation } from '@staff-portal/navigation'

import { QueryParams, QueryParamsOptions } from '../../types'
import { deserialize, serialize } from '../serializer/serializer'
import { sanitize, decode, encode } from '../encoder/encoder'

interface QueryParamState<T> {
  value: T
  resolving: boolean
}

const URL_UPDATE_DELAY = 500

const sanitizeQueryParams = <T extends QueryParams>(
  queryParams: QueryParams,
  configuration?: QueryParamsOptions
) => {
  return sanitize(queryParams, configuration) as T
}

const decodeQueryParams = async <T extends QueryParams>(
  queryParams: QueryParams,
  configuration?: QueryParamsOptions
) => {
  return (await decode(queryParams, configuration)) as T
}

export const useQueryParamsState = <T extends QueryParams>(
  configuration?: QueryParamsOptions,
  normalize?: (values: QueryParams) => QueryParams
): [T, (newValues: T, options?: Record<string, unknown>) => void, boolean] => {
  const history = useHistory()
  const { search, hash, pathname } = useLocation()

  const [queryParamsState, setQueryParamsState] = useState<QueryParamState<T>>({
    value: {} as T,
    resolving: true
  })

  const raceConditionCountRef = useRef(0)
  const areQueryParamsSanitized = useRef(false)
  const isProgrammaticNavigation = useRef(false)

  const updateHistory = useCallback(
    (encodedValues: QueryParams) => {
      const serializedValues = serialize(encodedValues)

      history.push(pathname + serializedValues + hash)
    },
    [history, hash, pathname]
  )

  const updateQueryParams = useCallback(
    (queryParams: T) => {
      const encodedValues = encode(queryParams, configuration)

      isProgrammaticNavigation.current = true
      updateHistory(encodedValues)
    },
    [configuration, updateHistory]
  )

  const navigateDebounced = useDebouncedCallback(
    updateQueryParams,
    URL_UPDATE_DELAY,
    { leading: true }
  )

  const setQueryParamsValueAndNavigate = useCallback(
    (queryParamsValue: T) => {
      if (!deepEqual(queryParamsValue, queryParamsState.value)) {
        setQueryParamsState({ value: queryParamsValue, resolving: false })
        navigateDebounced(queryParamsValue)
      }
    },
    [queryParamsState, navigateDebounced]
  )

  const tryToSanitizeQueryParamsAndNavigateIfNeeded = useCallback(
    (encodedValues: QueryParams) => {
      let hasSanitizedValues = false

      if (areQueryParamsSanitized.current) {
        return { hasSanitizedValues }
      }

      const normalizedValues = normalize?.(encodedValues)

      const sanitizedValues = sanitizeQueryParams<T>(
        normalizedValues ?? encodedValues,
        configuration
      )

      areQueryParamsSanitized.current = true

      hasSanitizedValues = !deepEqual(encodedValues, sanitizedValues)

      if (hasSanitizedValues) {
        updateHistory(sanitizedValues)
      }

      return { hasSanitizedValues, sanitizedValues }
    },
    [normalize, configuration, updateHistory, areQueryParamsSanitized]
  )

  useEffect(() => {
    if (isProgrammaticNavigation.current) {
      isProgrammaticNavigation.current = false

      return
    }

    ;(async () => {
      if (raceConditionCountRef.current) {
        setQueryParamsState(state => ({ ...state, resolving: true }))
      }

      raceConditionCountRef.current++

      const executionCount = raceConditionCountRef.current
      const encodedValues = deserialize(search)

      const { hasSanitizedValues } =
        tryToSanitizeQueryParamsAndNavigateIfNeeded(encodedValues)

      if (hasSanitizedValues) {
        return
      }

      const queryParamsValue = await decodeQueryParams<T>(
        encodedValues,
        configuration
      )

      if (executionCount === raceConditionCountRef.current) {
        setQueryParamsState({ value: queryParamsValue, resolving: false })
      }
    })()
  }, [search, configuration, tryToSanitizeQueryParamsAndNavigateIfNeeded])

  return [
    queryParamsState.value,
    setQueryParamsValueAndNavigate,
    queryParamsState.resolving
  ]
}
