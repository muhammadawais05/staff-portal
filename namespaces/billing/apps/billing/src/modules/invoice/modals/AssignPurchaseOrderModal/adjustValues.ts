import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const adjustValues = (values: AnyObject) => omit(values, ['purchaseOrderId'])

export default adjustValues
