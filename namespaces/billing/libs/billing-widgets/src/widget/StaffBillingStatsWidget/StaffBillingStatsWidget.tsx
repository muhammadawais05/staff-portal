import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { useBillingBaseProps } from '@staff-portal/billing'

import BillingStatsWidget from '../../modules/dashboard/components/BillingStatsWidget'

export interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffBillingStatsWidget: FC<Props> = memo<Props>(
  ({ baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <BillingStatsWidget />
      </App>
    )
  }
)

WidgetStaffBillingStatsWidget.displayName = 'WidgetStaffBillingStatsWidget'

export default WidgetStaffBillingStatsWidget
