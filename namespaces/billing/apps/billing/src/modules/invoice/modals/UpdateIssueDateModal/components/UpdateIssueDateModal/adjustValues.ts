import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = (values: AnyObject) => ({
  ...values,
  issueDate: DateTime.fromJSDate(values?.issueDate).toISODate()
})

export default adjustValues
