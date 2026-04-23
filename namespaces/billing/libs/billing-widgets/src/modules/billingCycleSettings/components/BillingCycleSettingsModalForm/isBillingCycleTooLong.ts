import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import { getDifferenceInDays } from '@staff-portal/billing/src/_lib/dateTime'

const MAX_BILLING_CYCLE_LENGTH_DAYS = 14

const isBillingCycleTooLong = (
  cycleStartDate?: Maybe<Scalars['Date']>,
  cycleEndDate?: Maybe<Scalars['Date']>
) =>
  Boolean(
    cycleStartDate &&
      cycleEndDate &&
      Math.floor(
        getDifferenceInDays({
          end: cycleEndDate,
          start: cycleStartDate
        })
      ) >= MAX_BILLING_CYCLE_LENGTH_DAYS
  )

export default isBillingCycleTooLong
