import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import BasicBillingInfo from '../../modules/billingInfo/components/BasicBillingInfo'

export interface Props {
  companyId: string
  baseAppProps?: BaseAppProps
}

const WidgetStaffBasicBillingInfo: FC<Props> = memo<Props>(
  ({ companyId, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <BasicBillingInfo companyId={companyId} />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffBasicBillingInfo.displayName = 'WidgetStaffBasicBillingInfo'

export default WidgetStaffBasicBillingInfo
