import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = (values: AnyObject) => ({
  ...values,
  dueDate: DateTime.fromJSDate(values?.dueDate).toISODate()
})

export default adjustValues
