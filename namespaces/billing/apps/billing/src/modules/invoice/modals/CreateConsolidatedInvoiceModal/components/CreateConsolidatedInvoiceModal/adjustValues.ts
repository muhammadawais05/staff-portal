import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const adjustValues = (values: AnyObject) => {
  return {
    ...omit(values, ['isEverythingSelected', 'billTo']),
    clientId: values.billTo,
    netTerms: Number(values.netTerms)
  }
}

export default adjustValues
