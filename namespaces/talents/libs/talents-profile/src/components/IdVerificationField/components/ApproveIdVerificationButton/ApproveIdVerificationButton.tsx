import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import ApproveIdVerificationModal from '../ApproveIdVerificationModal'

export type Props = {
  talentId: string
  operation: OperationType
}

export const ApproveIdVerificationButton = ({ talentId, operation }: Props) => {
  const { showModal } = useModal(ApproveIdVerificationModal, {
    talentId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          onClick={showModal}
          disabled={disabled}
          data-testid='open-approve-id-verification-modal'
        >
          Approve
        </Button>
      )}
    ></Operation>
  )
}

export default ApproveIdVerificationButton
