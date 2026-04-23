import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import { ResendContractMutation } from './data/resend-contract'
import ResendContractModal from '../ResendContractModal'

export interface Props {
  contractId: string
  onMutationSuccess?: (data: ResendContractMutation) => void
  hasLongLabel?: boolean
  operation: OperationType
}

const ResendContractButton = ({
  contractId,
  onMutationSuccess,
  hasLongLabel,
  operation
}: Props) => {
  const { showModal } = useModal(ResendContractModal, {
    contractId,
    onMutationSuccess
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Container right='xsmall'>
          <Button
            variant='secondary'
            size='small'
            disabled={disabled}
            onClick={showModal}
            data-testid='resend-contract-button'
          >
            {hasLongLabel ? 'Resend Contract' : 'Resend'}
          </Button>
        </Container>
      )}
    />
  )
}

export default ResendContractButton
