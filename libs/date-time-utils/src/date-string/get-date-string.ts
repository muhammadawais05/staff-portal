import { Scalars } from '@staff-portal/graphql/staff'

import formatDate from '../format-date'
import { DEFAULT_ISO_DATE_FORMAT } from '../constants'

const getDateString = (
  date: Date,
  params: { timeZone?: string } = {}
): Scalars['Date'] =>
  formatDate(date, {
    dateFormat: DEFAULT_ISO_DATE_FORMAT,
    timeZone: params.timeZone
  })

export default getDateString
