import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import BillingEngagementDetails from '../../modules/billingSettings/components/BillingEngagementDetails'
import InvoiceSettings from '../../modules/billingSettings/components/InvoiceSettings'

export interface Props {
  jobId: string
  modalsOnly?: boolean
  baseAppProps?: BaseAppProps
}

const StaffBillingSettingsWidget: FC<Props> = memo(
  ({ jobId, modalsOnly, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        {/* Remove after https://toptal-core.atlassian.net/browse/SPB-1683 */}
        {!modalsOnly && (
          <>
            <InvoiceSettings jobId={jobId} />
            <BillingEngagementDetails jobId={jobId} />
          </>
        )}
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

export default StaffBillingSettingsWidget
