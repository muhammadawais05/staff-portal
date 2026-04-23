import React from 'react'
import { StaffWidgetUnappliedCashModal } from '@staff-portal/billing-widgets'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { useBillingBaseProps } from '@staff-portal/billing'

export interface Props {
  companyId: string
  hideModal: () => void
}

const UnappliedCashModal = ({ companyId, hideModal }: Props) => {
  const baseProps = useBillingBaseProps()

  return (
    <Modal
      onClose={hideModal}
      open
      data-testid='ConfirmationModal'
      operationVariables={{
        nodeId: companyId,
        nodeType: NodeType.CLIENT,
        operationName: 'manageUnappliedCash'
      }}
    >
      <StaffWidgetUnappliedCashModal
        {...baseProps}
        clientId={companyId}
        handleOnClose={hideModal}
      />
    </Modal>
  )
}

export default UnappliedCashModal
