import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import BillingDetailsAddress from '../../modules/billingDetails/components/BillingDetailsAddress'
import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'

export interface Props {
  baseAppProps?: BaseAppProps
  companyId: string
}

const WidgetStaffBillingDetailsAddress: FC<Props> = memo<Props>(
  ({ companyId, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseAppProps} {...baseProps}>
        <ViewBillingOptionsContainer skeletonRowsSize={6}>
          <BillingDetailsAddress companyId={companyId} />
          <Modals container={baseAppProps?.modalContainer} />
        </ViewBillingOptionsContainer>
      </App>
    )
  }
)

export default WidgetStaffBillingDetailsAddress
