import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import PaymentGroupListPage from '../../modules/paymentGroup/page/PaymentGroupListPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPaymentGroupListPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  useTouchCounter({
    counterName: CounterName.PendingPaymentGroups
  })

  return (
    <App {...baseProps} {...baseAppProps}>
      <ScrollToTop />
      <PaymentGroupListPage />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

WidgetStaffPaymentGroupListPage.displayName = 'WidgetStaffPaymentGroupListPage'

export default WidgetStaffPaymentGroupListPage
