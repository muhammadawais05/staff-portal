import { Maybe } from '@toptal/picasso/utils'

import parseAndFormatDate from './parse-and-format-date'

const getPrefix = ({
  startDate,
  endDate
}: {
  startDate: string
  endDate: Maybe<string>
}) => {
  if (!endDate) {
    return 'From'
  }
  if (startDate === endDate) {
    return 'On'
  }

  return ''
}

export const getFormattedDateRange = ({
  startDate,
  endDate
}: {
  startDate: string
  endDate: Maybe<string>
}) => {
  const prefix = getPrefix({ startDate, endDate })
  const startFormatted = parseAndFormatDate(startDate)
  const endFormatted = parseAndFormatDate(endDate)
  const period = prefix ? startFormatted : `${startFormatted} - ${endFormatted}`

  return {
    prefix,
    period
  }
}
