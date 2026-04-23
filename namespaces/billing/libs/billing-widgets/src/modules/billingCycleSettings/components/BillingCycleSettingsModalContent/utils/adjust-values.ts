import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'
import { BillCycle } from '@staff-portal/graphql/staff'

const adjustValues = (changes: AnyObject) => {
  const isBillingCycleMonthBased = [
    BillCycle.SEMI_MONTHLY,
    BillCycle.MONTHLY
  ].includes(changes.billCycle)

  return isBillingCycleMonthBased
    ? omit(changes, ['billDay', 'currentCycleEndDate'])
    : changes
}

export default adjustValues
