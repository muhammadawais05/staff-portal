import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = (values: AnyObject) => ({
  ...values,
  actionDueOn: DateTime.fromJSDate(values?.actionDueOn).toISODate()
})

export default adjustValues
