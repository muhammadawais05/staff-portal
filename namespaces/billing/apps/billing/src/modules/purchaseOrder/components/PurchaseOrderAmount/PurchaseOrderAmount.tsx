import { Amount } from '@toptal/picasso'
import React, { FC, memo, ComponentProps } from 'react'

import { GetPurchaseOrderDetailsNodeFragment } from '../../pages/PurchaseOrderDetails/data/getPurchaseOrderDetails.graphql.types'
import { getColorByValues } from '../../utils'

const displayName = 'PurchaseOrderAmount'

interface Props extends Omit<ComponentProps<typeof Amount>, 'amount'> {
  purchaseOrder: Pick<
    GetPurchaseOrderDetailsNodeFragment,
    'invoicedAmount' | 'threshold' | 'totalAmount'
  >
}

// TODO:
// Remove this component when 'weight' inherit option will be applied inside Picasso
// https://toptal-core.atlassian.net/browse/FX-1561
const PurchaseOrderAmount: FC<Props> = memo(
  ({
    purchaseOrder: { invoicedAmount, totalAmount, threshold },
    ...amountProps
  }) => (
    <Amount
      {...amountProps}
      amount={invoicedAmount}
      color={getColorByValues({
        threshold,
        invoicedAmount,
        totalAmount
      })}
    />
  )
)

PurchaseOrderAmount.displayName = displayName

export default PurchaseOrderAmount
