import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'

import StaffJobPage from '../StaffJobPage'
import PlatformWrapper from '../PlatformWidget'

interface Props extends BaseAppProps {
  engagementId?: string
  modalsOnly?: boolean
}

const PlatformWidgetJobPage: FC<Props> = memo(props => (
  <PlatformWrapper
    render={platformProps => (
      <StaffJobPage
        variant='default'
        renderAppShell
        {...platformProps}
        {...props}
      />
    )}
  />
))

export default PlatformWidgetJobPage
