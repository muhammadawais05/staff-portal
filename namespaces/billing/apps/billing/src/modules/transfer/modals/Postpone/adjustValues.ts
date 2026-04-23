import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = (values: AnyObject) => ({
  ...values,
  pendingReceiptOn: DateTime.fromJSDate(values?.pendingReceiptOn).toISODate()
})

export default adjustValues
