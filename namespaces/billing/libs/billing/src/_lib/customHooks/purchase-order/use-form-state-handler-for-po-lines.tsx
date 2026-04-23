import { useEffect, useState } from 'react'
import { AnyObject, FormApi } from '@toptal/picasso-forms'

interface Props {
  initialPurchaseOrderId?: string
  change: FormApi['change']
  values: AnyObject
  purchaseOrderLines: AnyObject[]
  poFieldName?: string
  purchaseOrderFieldName?: string
  purchaseOrderLineFieldName?: string
}

export const useFormStateHandlerForPOLines = ({
  change,
  values,
  initialPurchaseOrderId,
  purchaseOrderLines,
  purchaseOrderFieldName = 'purchaseOrderId',
  purchaseOrderLineFieldName = 'purchaseOrderLineId'
}: Props) => {
  const [visiblePurchaseOrderLines, setVisiblePurchaseOrderLines] = useState(
    Boolean(initialPurchaseOrderId)
  )

  const selectedPurchaseOrderId = values?.[purchaseOrderFieldName] ?? ''

  useEffect(() => {
    if (selectedPurchaseOrderId === '') {
      setVisiblePurchaseOrderLines(false)
    } else {
      setVisiblePurchaseOrderLines(true)
    }

    if (selectedPurchaseOrderId !== initialPurchaseOrderId) {
      change(purchaseOrderLineFieldName, undefined)
    }
    if (purchaseOrderLines?.length === 2) {
      change(purchaseOrderLineFieldName, purchaseOrderLines[1].value)
    }
    // we only need this effect to run only
    // when the selected po id is changing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPurchaseOrderId])

  return { visiblePurchaseOrderLines }
}
