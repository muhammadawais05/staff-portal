import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import ExpectedCommissionListPage from '../../modules/expectedCommission/page/ExpectedCommissionListPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffExpectedCommissionListPage: FC<Props> = memo(
  ({ baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    useTouchCounter({
      counterName: CounterName.ExpectedCommissions
    })

    return (
      <App {...baseProps} {...baseAppProps}>
        <ScrollToTop />
        <ExpectedCommissionListPage />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffExpectedCommissionListPage.displayName =
  'WidgetStaffExpectedCommissionListPage'

export default WidgetStaffExpectedCommissionListPage
