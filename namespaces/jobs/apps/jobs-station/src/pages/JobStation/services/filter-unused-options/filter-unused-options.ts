import { CumulativeJobStatus } from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'

import { PostedAtRadioOptionValues } from '../../types'

const pendingTalent = CumulativeJobStatus.PENDING_ENGINEER.toLocaleLowerCase()
const custom_days = PostedAtRadioOptionValues.CUSTOM

// It doesn't make sense to update the URL with pending talent filter values if we
// don't actually filter for pending talent jobs.
const uncheckPendingFilterOptions = (filterValues: QueryParams) => {
  if (
    ((filterValues.cumulative_statuses as string[]) || []).includes(
      pendingTalent
    )
  ) {
    return filterValues
  }
  const { pending_talent_status, ...rest } = filterValues // eslint-disable-line @typescript-eslint/no-unused-vars

  return rest
}

const uncheckPostedAtRangeFilterOptions = (filterValues: QueryParams) => {
  if (((filterValues.posted_at as string[]) || []).includes(custom_days)) {
    return filterValues
  }
  const { posted_at_range, ...rest } = filterValues // eslint-disable-line @typescript-eslint/no-unused-vars

  return rest
}

export const filterUnusedOptions = (filterValues: QueryParams) => {
  const filters = [
    uncheckPendingFilterOptions,
    uncheckPostedAtRangeFilterOptions
  ]

  return filters.reduce((acc, _cur, index) => filters[index](acc), filterValues)
}
