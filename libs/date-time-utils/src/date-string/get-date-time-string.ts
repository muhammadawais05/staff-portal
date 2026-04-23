import { Scalars } from '@staff-portal/graphql/staff'

import formatDate from '../format-date'
import { DEFAULT_ISO_DATE_TIME_FORMAT } from '../constants'

const getDateTimeString = (
  date: Date,
  params: { timeZone: string }
): Scalars['Time'] =>
  formatDate(date, {
    dateFormat: DEFAULT_ISO_DATE_TIME_FORMAT,
    timeZone: params?.timeZone
  })

export default getDateTimeString
