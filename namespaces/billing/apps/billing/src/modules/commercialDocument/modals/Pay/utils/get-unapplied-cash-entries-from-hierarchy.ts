import { formatAmount } from '@toptal/picasso/utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { ClientWithUnappliedCashFragment } from '../data/getPayModalInvoice.graphql.types'

export const getUnappliedCashGroupsAsOptions = (
  groups: ClientWithUnappliedCashFragment[] = []
) => {
  if (groups.length === 0) {
    return [{ value: '', text: '' }]
  }

  return groups.reduce((acc, group) => {
    if (group?.unappliedCashEntries?.nodes?.length === 0) {
      return acc
    }

    return {
      ...acc,
      [group?.fullName]: group?.unappliedCashEntries?.nodes
        ?.filter(entry => Number(entry?.availableAmount) !== 0)
        ?.map(({ id, availableAmount: amount, effectiveDate }) => ({
          value: id,
          text: `${parseAndFormatDate(effectiveDate)} - ${formatAmount({
            amount
          })}`
        }))
    }
  }, {})
}
