import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useEncodedIdParam } from '@staff-portal/facilities'
import { useBillingBaseProps } from '@staff-portal/billing'

import InvoiceDetailsPage from '../../modules/invoice/pages/InvoiceDetailsPage'

interface Props {
  baseAppProps?: BaseAppProps
  modalsOnly?: boolean
}

const WidgetStaffInvoiceDetailsPage: FC<Props> = memo(
  ({ modalsOnly, baseAppProps }) => {
    const invoiceId = useEncodedIdParam('Invoice')
    const baseProps = useBillingBaseProps()

    if (!invoiceId) {
      return null
    }

    return (
      <App {...baseProps} {...baseAppProps}>
        {!modalsOnly && <InvoiceDetailsPage invoiceId={invoiceId} />}
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffInvoiceDetailsPage.displayName = 'WidgetStaffInvoiceDetailsPage'

export default WidgetStaffInvoiceDetailsPage
