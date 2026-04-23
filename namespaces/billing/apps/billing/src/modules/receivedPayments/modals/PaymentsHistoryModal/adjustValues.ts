import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = ({ endDate, startDate, ...rest }: AnyObject) => ({
  ...rest,
  startDate: DateTime.fromJSDate(startDate).toISODate(),
  endDate: DateTime.fromJSDate(endDate).toISODate()
})

export default adjustValues
