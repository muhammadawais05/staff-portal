import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import PurchaseOrderListPage from '../../modules/purchaseOrder/pages/PurchaseOrderList'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPurchaseOrderListPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  return (
    <App {...baseProps} {...baseAppProps}>
      <ScrollToTop />
      <PurchaseOrderListPage />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

WidgetStaffPurchaseOrderListPage.displayName =
  'WidgetStaffPurchaseOrderListPage'

export default WidgetStaffPurchaseOrderListPage
