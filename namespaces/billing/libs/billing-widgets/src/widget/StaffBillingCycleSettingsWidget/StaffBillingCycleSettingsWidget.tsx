import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import BillingCycleSettingsContent, {
  BillingCycleSettingsContentProps
} from '../../modules/billingCycles/components/BillingCycleSettingsContent'

export interface Props extends BillingCycleSettingsContentProps {
  baseAppProps?: BaseAppProps
}

const WidgetBillingCycleSettings: FC<Props> = memo(
  ({ children, engagementId, baseAppProps }) => {
    const { id: decodedEngagementId } = decodeEntityId(engagementId)
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <BillingCycleSettingsContent engagementId={decodedEngagementId}>
          {showModal => children(showModal)}
        </BillingCycleSettingsContent>
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

export default WidgetBillingCycleSettings
