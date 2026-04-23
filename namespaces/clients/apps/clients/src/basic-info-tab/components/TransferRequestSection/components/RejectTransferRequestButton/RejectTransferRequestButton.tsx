import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import RejectTransferRequestModal from '../RejectTransferRequestModal'

type Props = {
  transferRequestId: string
  companyId: string
  operation: OperationType
}

const RejectTransferRequestButton = ({
  transferRequestId,
  companyId,
  operation
}: Props) => {
  const { showModal } = useModal(RejectTransferRequestModal, {
    transferRequestId,
    companyId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          onClick={showModal}
          size='small'
          variant='negative'
        >
          Reject Request
        </Button>
      )}
    />
  )
}

export default RejectTransferRequestButton
