import { OpportunityJobFragment } from '../data'

export const sortByCreatedAtDate = (
  first: OpportunityJobFragment,
  second: OpportunityJobFragment
) => {
  const date1 = first.createdAt || ''
  const date2 = second.createdAt || ''

  if (date1 < date2) {
    return 1
  }
  if (date1 > date2) {
    return -1
  }

  return 0
}
