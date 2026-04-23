import { useMemo, useCallback } from 'react'
import {
  QueryParams,
  QueryParamsOptions,
  useQueryParamsState
, asQueryParam } from '@staff-portal/query-params-state'
import { usePagination } from '@staff-portal/filters'
import { localStorageService } from '@staff-portal/local-storage-service'

import { getSortOptions } from '../utils/get-sort-options'
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  LOCAL_STORAGE_PAGE_SIZE_KEY
} from '../config'

interface LimitQueryParamOptions {
  defaultLimit?: number
  availableLimits?: number[]
}

interface EmailTemplatesListQueryParams extends QueryParams {
  page?: number
  limit?: number
}

interface FilterParams extends QueryParams {
  limit?: number
}
interface Props {
  initialFilters?: FilterParams
}

export const LimitQueryParam = ({
  defaultLimit = DEFAULT_PAGE_SIZE,
  availableLimits
}: LimitQueryParamOptions = {}) =>
  asQueryParam({
    encode: (limit: number) => limit?.toString(),
    decode: (limitParam: string) => {
      const limit = parseInt(limitParam)

      if (
        limitParam &&
        (!limitParam.match(/^\d+$/) ||
          (availableLimits && !availableLimits.includes(limit)))
      ) {
        return defaultLimit
      }

      return limit
    }
  })

const getDefaultPageLimit = () => {
  const limit = localStorageService.getItem<number | string>(
    LOCAL_STORAGE_PAGE_SIZE_KEY
  )

  if (!limit) {
    return DEFAULT_PAGE_SIZE
  }

  return parseInt(limit.toString())
}

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  limit: LimitQueryParam({
    get defaultLimit() {
      return getDefaultPageLimit()
    },
    availableLimits: PAGE_SIZES
  })
}

const useHandleEmailTemplatesFilters = ({ initialFilters }: Props = {}) => {
  const [urlValues, setUrlValues, resolving] =
    useQueryParamsState<EmailTemplatesListQueryParams>(QUERY_PARAMS_CONFIG)

  const { page, filterValues, sortOptions } = useMemo(() => {
    const { page: activePage, ...restFilters } = urlValues

    const filters: FilterParams & { limit: number } = {
      ...initialFilters,
      ...restFilters,
      limit: restFilters.limit || getDefaultPageLimit()
    }

    return {
      page: activePage,
      filterValues: filters,
      sortOptions: getSortOptions()
    }
  }, [urlValues, initialFilters])

  const handlePageChange = useCallback(
    (newPage: number) =>
      setUrlValues({
        ...urlValues,
        page: newPage
      }),
    [urlValues, setUrlValues]
  )

  const handleFilterChange = useCallback(
    (values: Record<string, unknown>) => {
      const newLimit = values.limit as number

      localStorageService.setItem(LOCAL_STORAGE_PAGE_SIZE_KEY, newLimit)

      setUrlValues({ ...values, page: 1 })
    },
    [setUrlValues]
  )

  const { pagination } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: getDefaultPageLimit()
  })

  return {
    page,
    limit: filterValues.limit,
    pagination,
    filterValues,
    sortOptions,
    handlePageChange,
    handleFilterChange,
    resolving
  }
}

export default useHandleEmailTemplatesFilters
