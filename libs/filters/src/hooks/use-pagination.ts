import { useMemo, useCallback } from 'react'
import {
  DEFAULT_PAGE_SIZE,
  NUMBER_OF_ITEMS_DISPLAY_LIMIT
} from '@staff-portal/config'
import {
  QueryParams,
  QueryParamsOptions,
  useQueryParamsState
} from '@staff-portal/query-params-state'

import { pageQueryParam, limitQueryParam, getPaginationOffset } from '../utils'

export interface PaginationParams extends QueryParams {
  page?: string | number
  limit?: number
}

interface Props {
  onFilterChange?: (oldParams: QueryParams, newParams: QueryParams) => void
  config?: QueryParamsOptions
  limit: number
  maxItems?: number
  /**
   * todo : planned to be used in the future to scroll to some specific vertical position.
   *   relevant for pages where page content starts on some level below the top,
   *   eg after graphs, notifications, possible duplicates etc.
   */
  scrollTopPosition?: number
  availableLimits?: number[]
  normalizeFilters?: (values: QueryParams) => QueryParams
}

export const usePagination = <T extends PaginationParams>(
  {
    limit: defaultLimit,
    maxItems = NUMBER_OF_ITEMS_DISPLAY_LIMIT,
    config,
    onFilterChange,
    scrollTopPosition,
    availableLimits,
    normalizeFilters
  }: Props = { limit: DEFAULT_PAGE_SIZE }
) => {
  const stateOptions = useMemo(
    () => ({
      ...config,
      page: pageQueryParam({
        maxItems,
        itemsPerPage: defaultLimit
      }),
      limit: limitQueryParam({
        get defaultLimit() {
          return defaultLimit
        },
        availableLimits
      })
    }),
    [config, maxItems, defaultLimit, availableLimits]
  )

  const [urlValues, setUrlValues, resolving] = useQueryParamsState<T>(
    stateOptions,
    normalizeFilters
  )

  // todo: add vetting of url values as it's done for billing-frontend
  //   see namespaces/billing/apps/billing/src/modules/core/utils/listSearch/rejectEmpty.ts
  // const urlValues = rejectEmpty(rawUrlValues)

  const { page: rawPage, limit: rawLimit, ...filterValues } = urlValues
  const limit = useMemo(
    () => rawLimit ?? defaultLimit,
    [rawLimit, defaultLimit]
  )
  const page = useMemo(
    () => Math.max(rawPage ? +rawPage || 1 : 1, 1),
    [rawPage]
  )
  const offset = useMemo(
    () => getPaginationOffset(page ?? undefined, limit),
    [page, limit]
  )
  const pagination = useMemo(
    () => ({
      offset,
      limit
    }),
    [offset, limit]
  )

  const normalizePage = useCallback(
    (totalCount: number | undefined) => {
      const total = totalCount || Infinity

      const normalizedPage = rawPage || -Infinity
      const totalPages = Math.ceil(total / limit)

      if (
        rawPage !== undefined &&
        String(normalizedPage).match(/^[\d]+$/) === null
      ) {
        setUrlValues({ ...urlValues, page: 1 })

        return
      }

      if (total <= limit && normalizedPage >= totalPages) {
        setUrlValues({ ...urlValues, page: 1 })

        return
      }
    },
    [urlValues, setUrlValues, rawPage, limit]
  )

  const handlePageChange = useCallback(
    (newPage: number) => setUrlValues({ ...urlValues, page: newPage }),
    [urlValues, setUrlValues]
  )

  const handleLimitChange = useCallback(
    (newLimit: number) => setUrlValues({ ...urlValues, limit: newLimit }),
    [urlValues, setUrlValues]
  )

  const handleFilterChange = useCallback(
    (values: PaginationParams) => {
      onFilterChange?.(urlValues, values)
      setUrlValues({ ...values, page: 1 } as T, {
        skipActiveMenuChange: true,
        skipScrollToTop: true, // todo: currently not supported, also used in billing-frontend, please make it work
        scrollTopPosition // todo: currently not supported, please make it work
      })
    },
    [scrollTopPosition, onFilterChange, urlValues, setUrlValues]
  )

  return {
    filterValues,
    resolving,
    limit,
    offset,
    page,
    pagination,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    normalizePage
  }
}
