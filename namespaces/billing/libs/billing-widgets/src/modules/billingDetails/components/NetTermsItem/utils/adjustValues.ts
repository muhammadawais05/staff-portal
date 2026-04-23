import { AnyObject } from '@toptal/picasso-forms'

export const adjustValues = (values: AnyObject) => ({
  ...values,
  netTerms: parseInt(values.netTerms.split('.')[0] || 0)
})
