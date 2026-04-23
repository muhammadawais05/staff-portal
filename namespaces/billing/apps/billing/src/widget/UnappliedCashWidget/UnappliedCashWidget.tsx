import React, { FC, memo, ReactElement } from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'
import Modals from '@staff-portal/billing/src/components/Modals'

import UnappliedCashWidgetContent from './UnappliedCashWidgetContent'

export type UnappliedCashWidgetProps = {
  clientId: string
  children: (showModal: () => void) => ReactElement
}

export type Props = BaseAppProps & UnappliedCashWidgetProps

const UnappliedCashWidget: FC<Props> = memo(
  ({ children, clientId, ...baseProps }) => {
    return (
      <App {...baseProps}>
        <UnappliedCashWidgetContent children={children} clientId={clientId} />
        <Modals container={baseProps.modalContainer} />
      </App>
    )
  }
)

export default UnappliedCashWidget
