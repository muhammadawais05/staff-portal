import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import StaffOverviewPage from '@staff-portal/billing-widgets/src/widget/StaffOverviewPage'

import PlatformWrapper from '../PlatformWidget'

const PlatformWidgetOverviewPage: FC<BaseAppProps> = memo(props => (
  <PlatformWrapper
    render={({ dependenciesRegistry }) => (
      <StaffOverviewPage
        baseAppProps={{
          dependenciesRegistry,
          renderAppShell: true,
          ...props
        }}
      />
    )}
  />
))

export default PlatformWidgetOverviewPage
