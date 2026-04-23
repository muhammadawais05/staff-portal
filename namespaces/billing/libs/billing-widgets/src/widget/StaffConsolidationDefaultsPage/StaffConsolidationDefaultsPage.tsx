import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import ConsolidationDefaultsPage from '../../modules/billingDetails/pages/ConsolidationDefaultsPage'

export interface Props {
  clientId?: string
  modalsOnly?: boolean
  baseAppProps?: BaseAppProps
}

const WidgetStaffConsolidationDefaultsPage: FC<Props> = memo(
  ({ clientId = '', modalsOnly, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    const standalone = !!baseAppProps?.renderAppShell

    const verticalMargin = standalone ? 'xsmall' : 'medium'
    const horizontalMargin = standalone ? 'small' : 0

    return (
      <App
        renderAppShell={baseAppProps?.renderAppShell}
        {...baseProps}
        {...baseAppProps}
      >
        <ViewBillingOptionsContainer skeletonRowsSize={6}>
          {!modalsOnly && clientId && (
            <WidgetErrorBoundary
              emptyOnError={standalone}
              bubbleUpError={!standalone}
            >
              <Container
                top={verticalMargin}
                bottom={verticalMargin}
                left={horizontalMargin}
                right={horizontalMargin}
              >
                <ConsolidationDefaultsPage
                  clientId={clientId}
                  showTitle
                  sectionVariant={standalone ? undefined : 'withHeaderBar'}
                />
              </Container>
            </WidgetErrorBoundary>
          )}
          <Modals container={baseAppProps?.modalContainer} />
        </ViewBillingOptionsContainer>
      </App>
    )
  }
)

WidgetStaffConsolidationDefaultsPage.displayName =
  'WidgetStaffConsolidationDefaultsPage'

export default WidgetStaffConsolidationDefaultsPage
