import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { useEncodedIdParam } from '@staff-portal/facilities'
import { useBillingBaseProps } from '@staff-portal/billing'

import PaymentDetails from '../../modules/payment/pages/PaymentDetails'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPaymentDetailsPage: FC<Props> = memo<Props>(
  ({ baseAppProps }) => {
    const paymentId = useEncodedIdParam('Payment')
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <PaymentDetails paymentId={paymentId} />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffPaymentDetailsPage.displayName = 'WidgetStaffPaymentDetailsPage'

export default WidgetStaffPaymentDetailsPage
