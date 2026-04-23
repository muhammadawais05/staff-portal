import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import ReceivedPayments from '../../modules/receivedPayments/pages/ReceivedPayments'

interface Props {
  baseAppProps?: BaseAppProps
}

const StaffReceivedPaymentsPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()

  useTouchCounter({
    counterName: CounterName.Payments
  })

  return (
    <App {...baseProps} {...baseAppProps}>
      <ReceivedPayments />
      <Modals container={baseAppProps?.modalContainer} />
    </App>
  )
})

StaffReceivedPaymentsPage.displayName = 'StaffReceivedPaymentsPage'

export default StaffReceivedPaymentsPage
