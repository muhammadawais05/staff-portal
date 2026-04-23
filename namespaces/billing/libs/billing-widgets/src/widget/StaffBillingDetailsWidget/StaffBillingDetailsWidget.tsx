import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import BillingDetails from '../../modules/billingDetails/components/BillingDetails'

export interface Props {
  companyId: string
  baseAppProps?: BaseAppProps
}

const WidgetStaffBillingDetails: FC<Props> = memo<Props>(
  ({ companyId, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <ViewBillingOptionsContainer skeletonRowsSize={30}>
          <BillingDetails companyId={companyId} />
          <Modals container={baseAppProps?.modalContainer} />
        </ViewBillingOptionsContainer>
      </App>
    )
  }
)

WidgetStaffBillingDetails.displayName = 'WidgetStaffBillingDetails'

export default WidgetStaffBillingDetails
