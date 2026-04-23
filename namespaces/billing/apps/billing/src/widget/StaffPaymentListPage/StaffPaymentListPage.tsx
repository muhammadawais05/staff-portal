import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import PaymentListPage from '../../modules/payment/pages/PaymentList'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPaymentListPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  useTouchCounter({
    counterName: CounterName.PendingPayments
  })

  return (
    <App {...baseProps} {...baseAppProps}>
      <ScrollToTop />
      <PaymentListPage />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

WidgetStaffPaymentListPage.displayName = 'WidgetStaffPaymentListPage'

export default WidgetStaffPaymentListPage
