import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { useEncodedIdParam } from '@staff-portal/facilities'
import { useBillingBaseProps } from '@staff-portal/billing'

import PurchaseOrderDetails from '../../modules/purchaseOrder/pages/PurchaseOrderDetails'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPurchaseOrderDetailsPage: FC<Props> = memo<Props>(
  ({ baseAppProps }) => {
    const purchaseOrderId = useEncodedIdParam('PurchaseOrder')
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <PurchaseOrderDetails purchaseOrderId={purchaseOrderId} />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffPurchaseOrderDetailsPage.displayName =
  'WidgetStaffPurchaseOrderDetailsPage'

export default WidgetStaffPurchaseOrderDetailsPage
