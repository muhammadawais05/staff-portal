import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const omitEmptyValues = (values: AnyObject) => {
  let result = omit(values, 'disabled')

  if (result?.amount === '') {
    result = omit(result, ['amount'])
  }

  if (result?.threshold === '') {
    result = omit(result, ['threshold'])
  }

  if (result?.expiryDate === '') {
    result = omit(result, ['expiryDate'])
  }

  return result
}

const adjustValues = (values: AnyObject) => {
  const validRootObject = omitEmptyValues(
    omit(values, ['clientId__fake', 'clientName'])
  )

  const result = {
    ...validRootObject,
    purchaseOrderLinesAttributes:
      validRootObject?.purchaseOrderLinesAttributes?.map(omitEmptyValues)
  }

  return result
}

export default adjustValues
