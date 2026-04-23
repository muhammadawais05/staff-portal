import React, { FC, memo } from 'react'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import { useBillingBaseProps } from '@staff-portal/billing'

import StaffOverviewPage from '../../components/StaffOverviewPage'

export interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffOverviewPage: FC<Props> = memo(({ baseAppProps }) => {
  const baseProps = useBillingBaseProps()
  const standalone = !!baseAppProps?.renderAppShell

  return (
    <App {...baseProps} {...baseAppProps}>
      <WidgetErrorBoundary
        emptyOnError={standalone}
        bubbleUpError={!standalone}
      >
        <StaffOverviewPage />
      </WidgetErrorBoundary>
    </App>
  )
})

WidgetStaffOverviewPage.displayName = 'WidgetStaffOverviewPage'

export default WidgetStaffOverviewPage
