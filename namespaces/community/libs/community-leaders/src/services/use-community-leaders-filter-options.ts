import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  createInputCategory,
  enumQueryParam,
  GoogleCoordsParams,
  gqlIdQueryParam,
  searchBarQueryParam,
  usePagination
} from '@staff-portal/filters'
import { localStorageService } from '@staff-portal/local-storage-service'

import { DEFAULT_PAGE_SIZE, LOCAL_STORAGE_PAGE_SIZE_KEY } from '../constants'


const getDefaultPageLimit = () => {
  const limit = localStorageService.getItem<number | string>(
    LOCAL_STORAGE_PAGE_SIZE_KEY
  )

  if (!limit) {
    return DEFAULT_PAGE_SIZE
  }

  return parseInt(limit.toString())
}

const transformFilterValues = (filterValues: any) => {
  const locationFilter = filterValues?.location as GoogleCoordsParams | undefined
  const location = locationFilter && {
    latitude: Number(locationFilter.latitude),
    longitude: Number(locationFilter.longitude)
  }

  const countryId = filterValues.countryId ? filterValues.countryId : undefined


  return {
    ...filterValues,
    location,
    countryId,
  }
}

export const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam([createInputCategory({ name: 'names' })]),
  statuses: enumQueryParam,
  type: enumQueryParam,
  countryId: gqlIdQueryParam('Country')
}

export const useCommunityLeadersFilterOptions = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    handlePageChange,
    handleLimitChange,
    handleFilterChange,
    resolving: resolvingFilters
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: getDefaultPageLimit()
  })

  const transformedFilterValues = transformFilterValues(filterValues)

  const onFilterChange = (values: Record<string, unknown>) => {
    if (values.limit) {
      const newLimit = values.limit as number

      localStorageService.setItem(LOCAL_STORAGE_PAGE_SIZE_KEY, newLimit)

      handleLimitChange(newLimit)
    }

    handleFilterChange(values)
  }

  return {
    page,
    pagination,
    limit,
    filterValues: transformedFilterValues,
    resolvingFilters,
    handlePageChange,
    handleFilterChange: onFilterChange
  }
}
