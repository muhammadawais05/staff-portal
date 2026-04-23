import React, { FC, memo } from 'react'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import App from '@staff-portal/billing/src/components/App'

import UnappliedCashModal from '../../modules/unappliedCash/modals/components/RecordModal'

export type UnappliedCashWidgetProps = {
  clientId: string
  handleOnClose?: () => void
}

export type Props = BaseAppProps & UnappliedCashWidgetProps

const StaffWidgetUnappliedCashModal: FC<Props> = memo(
  ({ clientId, handleOnClose, ...baseProps }) => {
    return (
      <App {...baseProps}>
        <UnappliedCashModal
          options={{ clientId } as Required<ModalData>}
          handleOnClose={handleOnClose}
        />
      </App>
    )
  }
)

export default StaffWidgetUnappliedCashModal
