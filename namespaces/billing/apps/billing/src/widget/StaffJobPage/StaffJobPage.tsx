import React, { FC, memo } from 'react'
import { SectionProps } from '@toptal/picasso'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'

import JobPage from '../../modules/job/pages/JobPage'

interface Props extends BaseAppProps {
  engagementId?: string
  modalsOnly?: boolean
  variant?: SectionProps['variant']
}

const WidgetStaffJobPage: FC<Props> = memo(
  ({
    engagementId = '',
    modalsOnly,
    renderAppShell,
    variant = 'withHeaderBar',
    ...rest
  }) => {
    const { modalContainer } = rest

    const standalone = !!renderAppShell

    return (
      <App {...{ renderAppShell }} {...rest}>
        {!modalsOnly && engagementId && (
          <WidgetErrorBoundary
            emptyOnError={standalone}
            bubbleUpError={!standalone}
          >
            <JobPage variant={variant} engagementId={engagementId} />
          </WidgetErrorBoundary>
        )}
        <Modals container={modalContainer} />
      </App>
    )
  }
)

WidgetStaffJobPage.displayName = 'WidgetStaffJobPage'

export default WidgetStaffJobPage
