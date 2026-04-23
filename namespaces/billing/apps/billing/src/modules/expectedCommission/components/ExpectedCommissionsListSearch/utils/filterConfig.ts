import {
  FiltersConfig,
  FiltersKeyMapConfig
} from '@staff-portal/billing/src/_lib/filters/filters-types'
import { fullFillConfig } from '@staff-portal/billing/src/_lib/filters/filters-config'

import { kindsFilterConfig, expectedDate } from '../filters'

export const FILTERS_CONFIG: FiltersKeyMapConfig = [
  expectedDate,
  kindsFilterConfig
]

export const useFiltersConfig = (): {
  filtersConfig: FiltersConfig
  loading: boolean
} => {
  const { config: filtersConfig, loading } = fullFillConfig(FILTERS_CONFIG)

  return {
    filtersConfig,
    loading
  }
}
