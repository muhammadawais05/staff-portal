import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import BasicBillingInfo from '@staff-portal/billing-widgets/src/modules/billingInfo/components/BasicBillingInfo'
import BillingDetails from '@staff-portal/billing-widgets/src/modules/billingDetails/components/BillingDetails'
import Commissions from '@staff-portal/billing-widgets/src/modules/commission/components/Commission'

interface Props extends BaseAppProps {
  companyId: string
}

const WidgetStaffCompanyProfileWidget: FC<Props> = memo<Props>(
  ({ companyId, ...baseProps }) => {
    return (
      <App {...baseProps}>
        <BasicBillingInfo companyId={companyId} />
        <BillingDetails companyId={companyId} />
        <Commissions nodeId={companyId} />
        <Modals container={baseProps.modalContainer} />
      </App>
    )
  }
)

WidgetStaffCompanyProfileWidget.displayName = 'WidgetStaffCompanyProfileWidget'

export default WidgetStaffCompanyProfileWidget
