import { buildDateRangeFilter } from '@staff-portal/billing/src/_lib/filters/filters-builders'

export const expectedDate = buildDateRangeFilter(
  'expected_date',
  'expectedDate'
)
