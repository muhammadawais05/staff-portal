import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const getAdjustedValues = (values: AnyObject) =>
  omit(values, 'referrerId__fake')

export default getAdjustedValues
