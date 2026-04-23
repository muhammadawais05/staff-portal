import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'
import { getFormattedDateRange } from '@staff-portal/date-time-utils'

const getFeedbackDetailsPeriod = ({
  targetPeriodSingleDay,
  targetPeriodStartDate,
  targetPeriodEndDate
}: {
  targetPeriodSingleDay?: Maybe<boolean>
  targetPeriodStartDate?: Maybe<string>
  targetPeriodEndDate?: Maybe<string>
}) => {
  if (targetPeriodStartDate) {
    if (targetPeriodSingleDay) {
      const { period } = getFormattedDateRange({
        startDate: targetPeriodStartDate,
        endDate: null
      })

      return `On ${period}`
    }

    const { prefix, period } = getFormattedDateRange({
      startDate: targetPeriodStartDate,
      endDate: targetPeriodEndDate
    })

    return prefix ? `${prefix} ${period}` : period
  }

  return NO_VALUE
}

export default getFeedbackDetailsPeriod
