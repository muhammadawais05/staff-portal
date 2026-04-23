import React, { FC, memo } from 'react'
import { ScrollToTop } from '@staff-portal/ui'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useBillingBaseProps } from '@staff-portal/billing'

import MyExpectedCommissionListPage from '../../modules/expectedCommission/page/MyExpectedCommissionListPage'

interface Props {
  baseAppProps?: BaseAppProps
}

const WidgetStaffMyExpectedCommissionListPage: FC<Props> = memo(
  ({ baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    useTouchCounter({
      counterName: CounterName.ExpectedCommissions
    })

    return (
      <App {...baseProps} {...baseAppProps}>
        <ScrollToTop />
        <MyExpectedCommissionListPage />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffMyExpectedCommissionListPage.displayName =
  'WidgetStaffMyExpectedCommissionListPage'

export default WidgetStaffMyExpectedCommissionListPage
