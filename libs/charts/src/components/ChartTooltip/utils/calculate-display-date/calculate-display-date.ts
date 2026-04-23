import {
  subMinutes,
  addDays,
  toDate,
  zonedTimeToUtc
} from '@staff-portal/date-time-utils'

import { LineChartGranularity } from '../../../../types'

export const calculateDisplayDate = (
  dateString: string,
  serverTimeZoneName: string,
  granularity?: LineChartGranularity
) => {
  const date = toDate(dateString)
  const serverDate =
    granularity === 'hour' ? date : subMinutes(addDays(date, 1), 1)
  const utcDate = zonedTimeToUtc(serverDate, serverTimeZoneName)

  return {
    serverDate,
    utcDate
  }
}
