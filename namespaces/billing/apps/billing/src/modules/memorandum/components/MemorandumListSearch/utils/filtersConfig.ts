import { FiltersConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import {
  buildDateRangeFilter,
  buildHiddenFilter
} from '@staff-portal/billing/src/_lib/filters/filters-builders'
import { fullFillConfig } from '@staff-portal/billing/src/_lib/filters/filters-config'

import { balanceFilterConfig, statusFilterConfig } from '../filters'

export const useFiltersConfig = (): {
  filtersConfig: FiltersConfig
  loading: boolean
} => {
  const { config: filtersConfig, loading } = fullFillConfig([
    buildDateRangeFilter('creation_date', 'creationDate'),
    buildDateRangeFilter('allocation_date', 'allocationDate'),
    balanceFilterConfig,
    statusFilterConfig,
    buildHiddenFilter('engagement_id')
  ])

  return {
    filtersConfig,
    loading
  }
}
