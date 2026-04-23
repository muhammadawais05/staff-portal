import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import ReconciliationPage from '../../modules/invoice/pages/ReconciliationPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffPaymentReconciliationToolPage: FC<Props> = memo(
  ({ baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <ScrollToTop />
        <ReconciliationPage />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffPaymentReconciliationToolPage.displayName =
  'WidgetStaffPaymentReconciliationToolPage'

export default WidgetStaffPaymentReconciliationToolPage
