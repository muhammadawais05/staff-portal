import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import { VerifyContractMutation } from '../VerifyContractModal/data/verify-contract'
import VerifyContractModal from '../VerifyContractModal'

export interface Props {
  contractId: string
  onMutationSuccess?: (data: VerifyContractMutation) => void
  hasLongLabel?: boolean
  operation: OperationType
}

const VerifyContractButton = ({
  contractId,
  operation,
  onMutationSuccess,
  hasLongLabel
}: Props) => {
  const { showModal } = useModal(VerifyContractModal, {
    contractId,
    onMutationSuccess
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          variant='positive'
          size='small'
          onClick={showModal}
          data-testid='verify-button'
        >
          {hasLongLabel ? 'Verify Contract' : 'Verify'}
        </Button>
      )}
    />
  )
}

export default VerifyContractButton
