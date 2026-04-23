import { isWithinDateInterval } from '@staff-portal/date-time-utils'

import { HiredTalentBillingCycleFragment } from '../../data/get-hired-talent-content/get-hired-talent-content.staff.gql.types'

export const isCurrentBillingCyclesVisible = (
  cycles: HiredTalentBillingCycleFragment[]
) =>
  cycles.some(({ startDate, endDate }) =>
    isWithinDateInterval({ start: startDate, end: endDate })
  )
