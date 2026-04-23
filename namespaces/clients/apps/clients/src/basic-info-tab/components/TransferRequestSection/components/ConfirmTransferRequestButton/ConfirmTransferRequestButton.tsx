import React from 'react'
import { Button } from '@toptal/picasso'
import {
  Operation as OperationType,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import ConfirmTransferRequestModal from '../ConfirmTransferRequestModal'

type Props = {
  transferRequestid: string
  requestedTransferId: string
  companyId: string
  operation: OperationType
  scope: RoleV2Scope
}

const ConfirmTransferRequestButton = ({
  transferRequestid,
  requestedTransferId,
  companyId,
  operation,
  scope
}: Props) => {
  const { showModal } = useModal(ConfirmTransferRequestModal, {
    requestedTransferId,
    transferRequestid,
    companyId,
    scope
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          onClick={showModal}
          size='small'
          variant='positive'
        >
          Confirm Request
        </Button>
      )}
    />
  )
}

export default ConfirmTransferRequestButton
