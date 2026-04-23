import { OpportunityFragment } from '@staff-portal/opportunities'

export const sortByRecentUpdateDate = (
  first: OpportunityFragment,
  second: OpportunityFragment
) => {
  const date1 = first.updatedAt || ''
  const date2 = second.updatedAt || ''

  if (date1 < date2) {
    return 1
  }
  if (date1 > date2) {
    return -1
  }

  return 0
}
