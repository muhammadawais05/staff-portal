import React, { FC, memo } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import BillingInformationNotes from '../../modules/billingInformationNotes/components/BillingInformationNotes'

export interface Props {
  baseAppProps?: BaseAppProps
  companyId: string
}

const WidgetStaffBillingInformationNotes: FC<Props> = memo(
  ({ companyId, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <ViewBillingOptionsContainer skeletonRowsSize={5}>
          <BillingInformationNotes companyId={companyId} />
          <Modals container={baseAppProps?.modalContainer} />
        </ViewBillingOptionsContainer>
      </App>
    )
  }
)

WidgetStaffBillingInformationNotes.displayName =
  'WidgetStaffBillingInformationNotes'

export default WidgetStaffBillingInformationNotes
