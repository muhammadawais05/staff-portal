import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useEncodedIdParam } from '@staff-portal/facilities'
import { useBillingBaseProps } from '@staff-portal/billing'

import PaymentGroupDetailsPage from '../../modules/paymentGroup/page/PaymentGroupDetailsPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffExpectedCommissionListPage: FC<Props> = memo(
  ({ baseAppProps }) => {
    const paymentGroupId = useEncodedIdParam('PaymentGroup')
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <PaymentGroupDetailsPage paymentGroupId={paymentGroupId} />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffExpectedCommissionListPage.displayName =
  'WidgetStaffExpectedCommissionListPage'

export default WidgetStaffExpectedCommissionListPage
