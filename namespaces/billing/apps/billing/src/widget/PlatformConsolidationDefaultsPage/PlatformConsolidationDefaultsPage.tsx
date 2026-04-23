import React, { FC, memo } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import StaffConsolidationDefaultsWidget from '@staff-portal/billing-widgets/src/widget/StaffConsolidationDefaultsPage'

import PlatformWrapper from '../PlatformWidget'

interface Props extends BaseAppProps {
  clientId?: string
  modalsOnly?: boolean
}

const PlatformWidgetConsolidationDefaultsPage: FC<Props> = memo(
  ({ clientId, modalsOnly, ...appProps }) => (
    <PlatformWrapper
      render={({ dependenciesRegistry }) => (
        <StaffConsolidationDefaultsWidget
          clientId={clientId}
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

export default PlatformWidgetConsolidationDefaultsPage
