import {
  FiltersConfig,
  FiltersKeyMapConfig
} from '@staff-portal/billing/src/_lib/filters/filters-types'
import {
  buildAmountFilter,
  buildDateRangeFilter
} from '@staff-portal/billing/src/_lib/filters/filters-builders'
import { fullFillConfig } from '@staff-portal/billing/src/_lib/filters/filters-config'

import {
  payeeRoleConfig,
  kindsFilterConfig,
  presetsFilterConfig,
  primaryMethodsConfig,
  toptalPayments,
  statusesFilterConfig
} from '../../filters'

const createOn = buildDateRangeFilter('created_on', 'issuedOn')

const dueDate = buildDateRangeFilter('due_date', 'dueOn')

const amount = buildAmountFilter('amount')

const paidAt = buildDateRangeFilter('paid_at', 'paidOn')

export const FILTERS_CONFIG: FiltersKeyMapConfig = [
  presetsFilterConfig,
  createOn,
  dueDate,
  amount,
  paidAt,
  statusesFilterConfig,
  payeeRoleConfig,
  kindsFilterConfig,
  primaryMethodsConfig,
  toptalPayments
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
