import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { useBillingBaseProps } from '@staff-portal/billing'
import { useEncodedIdParams } from '@staff-portal/facilities'

import PurchaseOrderLineDetails from '../../modules/purchaseOrder/pages/PurchaseOrderLineDetails'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPurchaseOrderLineDetailsPage: FC<Props> = memo<Props>(
  ({ baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
      poId: 'PurchaseOrder',
      id: 'PurchaseOrderLine'
    })

    return (
      <App {...baseProps} {...baseAppProps}>
        <PurchaseOrderLineDetails
          purchaseOrderLineId={purchaseOrderLineId as string}
          purchaseOrderId={purchaseOrderId}
        />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffPurchaseOrderLineDetailsPage.displayName =
  'WidgetStaffPurchaseOrderLineDetailsPage'

export default WidgetStaffPurchaseOrderLineDetailsPage
