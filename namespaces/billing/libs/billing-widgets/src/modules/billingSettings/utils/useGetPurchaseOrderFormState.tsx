import { useState, useEffect } from 'react'
import { AnyObject, FormApi } from '@toptal/picasso-forms'

import { GetPurchaseOrdersOptionsQuery } from '../data/getPurchaseOrdersOptions.graphql.types'
import { mapPurchaseOrdersToListOptions } from './assignablePurchaseOrdersSerializer'

interface Props {
  currentPOid?: string
  change: FormApi['change']
  values: AnyObject
  poLineFieldName?: string
  poFieldName?: string
  data?: NonNullable<
    GetPurchaseOrdersOptionsQuery['node']
  >['client']['purchaseOrdersNullable']
}

export const useGetPurchaseOrderFormState = ({
  currentPOid,
  change,
  poLineFieldName = 'purchaseOrderLineId',
  poFieldName = 'purchaseOrderId',
  values,
  data
}: Props) => {
  const [visiblePurchaseOrderLines, setVisiblePurchaseOrderLines] = useState(
    Boolean(currentPOid)
  )

  const purchaseOrders = mapPurchaseOrdersToListOptions(data)
  const selectedPurchaseOrderId = values[poFieldName] ?? ''

  const purchaseOrderLines = mapPurchaseOrdersToListOptions(
    data?.nodes?.find(({ id }) => id === selectedPurchaseOrderId)
      ?.purchaseOrderLines
  )

  useEffect(() => {
    if (selectedPurchaseOrderId !== '') {
      setVisiblePurchaseOrderLines(true)
    } else {
      setVisiblePurchaseOrderLines(false)
      change(poLineFieldName, undefined)
    }
  }, [selectedPurchaseOrderId, change, poLineFieldName])

  useEffect(() => {
    if (selectedPurchaseOrderId === '') {
      return
    }
    if (purchaseOrderLines?.length === 2) {
      change(poLineFieldName, purchaseOrderLines[1].value)
    }
  }, [
    change,
    purchaseOrderLines,
    selectedPurchaseOrderId,
    poLineFieldName,
    currentPOid
  ])

  return {
    purchaseOrders,
    purchaseOrderLines,
    visiblePurchaseOrderLines
  }
}

export default useGetPurchaseOrderFormState
