import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import StaffEngagementPage from '@staff-portal/billing-widgets/src/widget/StaffEngagementPage'

import PlatformWrapper from '../PlatformWidget'

interface Props extends BaseAppProps {
  engagementId?: string
  modalsOnly?: boolean
}

const PlatformWidgetEngagementPage: FC<Props> = memo(
  ({ engagementId, modalsOnly, ...appProps }) => (
    <PlatformWrapper
      render={({ dependenciesRegistry }) => (
        <StaffEngagementPage
          variant='default'
          engagementId={engagementId}
          modalsOnly={modalsOnly}
          baseAppProps={{
            renderAppShell: true,
            dependenciesRegistry,
            ...appProps
          }}
        />
      )}
    />
  )
)

export default PlatformWidgetEngagementPage
