import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = ({ filter = {}, ...rest }: AnyObject) => ({
  ...rest,
  filter: {
    ...filter,
    startDate: DateTime.fromJSDate(filter.startDate).toISODate(),
    endDate: DateTime.fromJSDate(filter.endDate).toISODate()
  }
})

export default adjustValues
