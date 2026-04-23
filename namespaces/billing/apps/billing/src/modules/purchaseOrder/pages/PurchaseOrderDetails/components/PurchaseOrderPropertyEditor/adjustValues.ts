import { AnyObject } from '@toptal/picasso-forms'
import { DateTime } from 'luxon'

const adjustValues = (name: string) => (values: AnyObject) => {
  if (name === 'expiryDate') {
    return {
      ...values,
      expiryDate: DateTime.fromJSDate(values.expiryDate).toISODate()
    }
  }

  return {
    ...values,
    [name]: values[name] || null
  }
}

export default adjustValues
