import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  usePagination,
  dateRangeQueryParam,
  rangeQueryParam,
  searchBarQueryParam
} from '@staff-portal/filters'
import {
  searchBarCategories,
  DEFAULT_PAGE_SIZE
} from '@staff-portal/talents-list'
import { localStorageService } from '@staff-portal/local-storage-service'
import { useCallback } from 'react'

import {
  getSortOptions,
  ofacStatusQueryParam,
  applicantsFilterQueryParam,
  activationFilterTypeQueryParam
} from '../utils'
import { LOCAL_STORAGE_PAGE_SIZE_KEY } from '../config'

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
  applied_on: dateRangeQueryParam,
  timezones: rangeQueryParam,
  ofac_status: ofacStatusQueryParam,
  applicant_filter: applicantsFilterQueryParam,
  activation_filter_type: activationFilterTypeQueryParam,
  badges: searchBarQueryParam(searchBarCategories)
}

const resetApplicantOrActivationFilter = (
  filterValues: Record<string, unknown>,
  previousFilterValues: Record<string, unknown>
) => {
  if (
    filterValues.applicant_filter &&
    previousFilterValues.applicant_filter &&
    filterValues.activation_filter_type
  ) {
    return { ...filterValues, applicant_filter: undefined }
  }

  if (
    filterValues.activation_filter_type &&
    previousFilterValues.activation_filter_type &&
    filterValues.applicant_filter
  ) {
    return { ...filterValues, activation_filter_type: undefined }
  }

  return filterValues
}

const useHandleTalentApplicantsFilters = () => {
  const {
    page,
    pagination,
    limit,
    filterValues,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: getDefaultPageLimit()
  })

  const onFilterChange = useCallback(
    (values: Record<string, unknown>) => {
      if (values.limit) {
        localStorageService.setItem(
          LOCAL_STORAGE_PAGE_SIZE_KEY,
          values.limit as number
        )
      }

      const newFilterValues = resetApplicantOrActivationFilter(
        values,
        filterValues
      )

      handleFilterChange(newFilterValues)
    },
    [filterValues, handleFilterChange]
  )

  return {
    page,
    pagination,
    limit,
    filterValues,
    sortOptions: getSortOptions(filterValues),
    handlePageChange,
    handleFilterChange: onFilterChange,
    resolving
  }
}

export default useHandleTalentApplicantsFilters
