import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import InvoiceListPage from '../../modules/invoice/pages/InvoiceListPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffInvoiceListPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  useTouchCounter({
    counterName: CounterName.PendingInvoices
  })

  return (
    <App {...baseProps} {...baseAppProps}>
      <ScrollToTop />
      <InvoiceListPage />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

WidgetStaffInvoiceListPage.displayName = 'WidgetStaffInvoiceListPage'

export default WidgetStaffInvoiceListPage
