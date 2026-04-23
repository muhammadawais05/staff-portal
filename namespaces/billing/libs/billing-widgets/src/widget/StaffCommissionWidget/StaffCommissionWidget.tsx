import React, { FC, memo, ComponentProps } from 'react'
import App from '@staff-portal/billing/src/components/App'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import Modals from '@staff-portal/billing/src/components/Modals'
import { useBillingBaseProps } from '@staff-portal/billing'

import Commission from '../../modules/commission/components/Commission'

export interface Props extends ComponentProps<typeof Commission> {
  baseAppProps?: BaseAppProps
}

const WidgetStaffCommission: FC<Props> = memo<Props>(
  ({ nodeId, isActionsHidden, baseAppProps }) => {
    const baseProps = useBillingBaseProps()

    return (
      <App {...baseProps} {...baseAppProps}>
        <Commission nodeId={nodeId} isActionsHidden={isActionsHidden} />
        <Modals container={baseAppProps?.modalContainer} />
      </App>
    )
  }
)

WidgetStaffCommission.displayName = 'WidgetStaffCommission'

export default WidgetStaffCommission
