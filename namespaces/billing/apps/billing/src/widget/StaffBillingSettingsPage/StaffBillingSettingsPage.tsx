import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'
import { useEncodedIdParam } from '@staff-portal/facilities'

import BillingSettingsPage from '../../modules/billingSettings/pages/BillingSettingsPage'

interface Props {
  modalsOnly?: boolean
  baseAppProps?: BaseAppProps
}

const WidgetStaffBillingSettingsPage: FC<Props> = memo(
  ({ baseAppProps, modalsOnly }) => {
    const baseProps = useBillingBaseProps()
    const jobId = useEncodedIdParam('Job')

    return (
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      <App {...baseProps} {...baseAppProps}>
        {/* Remove after https://toptal-core.atlassian.net/browse/SPB-1683 */}
        {!modalsOnly && <BillingSettingsPage jobId={jobId} />}
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

export default WidgetStaffBillingSettingsPage
