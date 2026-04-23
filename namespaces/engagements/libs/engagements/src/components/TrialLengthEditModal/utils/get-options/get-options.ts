import { Maybe } from '@staff-portal/graphql/staff'
import { isFutureZonedTime } from '@staff-portal/date-time-utils'

import { getBusinessCopy } from '../get-business-copy'

export type Props = {
  maxEngagementTrialLength?: number
  startDate?: Maybe<string>
  timeZone?: string
}

const getOptions = ({
  maxEngagementTrialLength,
  startDate,
  timeZone
}: Props) => {
  const options = maxEngagementTrialLength
    ? Array.from(Array(maxEngagementTrialLength), (_, item) => ({
        text: getBusinessCopy(item + 1),
        value: item + 1
      })).reverse()
    : []

  if (
    !startDate ||
    !timeZone ||
    isFutureZonedTime({
      date: startDate,
      timeZone
    })
  ) {
    options.push({
      text: 'No trial',
      value: 0
    })
  }

  return options
}

export default getOptions
