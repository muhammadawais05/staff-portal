import { Maybe } from '@toptal/picasso/utils'
import { AggregatedTalentClientHourlyRatesItem } from '@staff-portal/graphql/staff'

import {
  HourlyRateRange,
  inRange
} from '../../components/JobMaxHourlyRateWidgets/utils/inRange'

export const getApplicableTalentPool = (
  aggregatedTalentClientHourlyRates: Maybe<
    AggregatedTalentClientHourlyRatesItem[]
  >,
  maxHourlyRate?: HourlyRateRange
) => {
  if (
    maxHourlyRate === null ||
    maxHourlyRate === undefined ||
    !aggregatedTalentClientHourlyRates
  ) {
    return 0
  }

  const counts = aggregatedTalentClientHourlyRates.reduce(
    (current, item) => ({
      applicable:
        (inRange(item.from, maxHourlyRate) ? item.count : 0) +
        current.applicable,
      total: current.total + item.count
    }),
    { applicable: 0, total: 0 }
  )

  // handle cases where NaN (0/0) or Infinity (number/0) can be received on line 26
  if (counts.total === 0) {
    return 0
  }

  return Math.round((counts.applicable / counts.total) * 100)
}
