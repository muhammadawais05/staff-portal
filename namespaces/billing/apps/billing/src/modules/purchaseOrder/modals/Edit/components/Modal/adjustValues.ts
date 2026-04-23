import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const omitEmptyValues = (values: AnyObject) => {
  let result = omit(values, 'disabled')

  if (result?.amount === '') {
    result = { ...result, amount: null }
  }

  if (result?.threshold === '') {
    result = { ...result, threshold: null }
  }

  if (result?.expiryDate === '') {
    result = omit(result, ['expiryDate'])
  }

  if (result?.id && result?.number) {
    return omit(result, ['number'])
  }

  return result
}

const adjustValues = (values: AnyObject) => {
  const validRootValues = omit(values, [
    'clientId',
    'number',
    'clientId__fake',
    'clientName'
  ])

  const result = {
    ...validRootValues,
    purchaseOrderLinesAttributes:
      validRootValues?.purchaseOrderLinesAttributes?.map(omitEmptyValues)
  }

  return result
}

export default adjustValues
