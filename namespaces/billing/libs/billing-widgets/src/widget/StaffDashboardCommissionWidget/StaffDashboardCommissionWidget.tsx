import React, { FC, memo, ComponentProps } from 'react'
import { DashboardItemWrapper } from '@staff-portal/ui'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import { useBillingBaseProps } from '@staff-portal/billing'

import DashboardCommissionWidget from '../../modules/dashboard/components/CommissionWidget'

export interface Props {
  baseAppProps?: BaseAppProps
  gridSize?: ComponentProps<typeof DashboardItemWrapper>['gridSize']
}

const WidgetStaffCommissionWidget: FC<Props> = memo<Props>(
  ({ gridSize, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <DashboardCommissionWidget gridSize={gridSize} />
      </App>
    )
  }
)

WidgetStaffCommissionWidget.displayName = 'WidgetStaffCommissionWidget'

export default WidgetStaffCommissionWidget
