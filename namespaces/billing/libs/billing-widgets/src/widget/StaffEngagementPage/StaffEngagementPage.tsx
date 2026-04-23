import { TypedMessage } from '@toptal/staff-portal-message-bus'
import { SectionProps } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import EngagementPage from '../../modules/engagement/pages/EngagementPage'

export interface Props {
  baseAppProps?: BaseAppProps
  engagementId?: string
  modalsOnly?: boolean
  listenedBillingCycleMessages?: TypedMessage[]
  variant?: SectionProps['variant']
}

const WidgetStaffEngagementPage: FC<Props> = memo(
  ({
    engagementId,
    modalsOnly,
    listenedBillingCycleMessages,
    variant = 'withHeaderBar',
    baseAppProps
  }) => {
    const baseProps = useBillingBaseProps()

    if (!engagementId) {
      return null
    }

    const standalone = !!baseAppProps?.renderAppShell

    return (
      <App {...baseProps} {...baseAppProps}>
        {!modalsOnly && (
          <WidgetErrorBoundary
            emptyOnError={standalone}
            bubbleUpError={!standalone}
          >
            <EngagementPage
              variant={variant}
              engagementId={engagementId}
              listenedBillingCycleMessages={listenedBillingCycleMessages}
            />
          </WidgetErrorBoundary>
        )}
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffEngagementPage.displayName = 'WidgetStaffEngagementPage'

export default WidgetStaffEngagementPage
