import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  ContractKind,
  ContractStatus,
  Link,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { DestroyContractMutation } from '../DeleteContractModal/data/destroy-contract'
import DeleteContractModal from '../DeleteContractModal/DeleteContractModal'

export type Props = {
  contractId: string
  contractKind?: ContractKind | null
  contractStatus?: ContractStatus | null
  contractWebResource: Link
  operation: OperationType
  onMutationSuccess?: (data: DestroyContractMutation) => void
}

const DeleteContractButton = (props: Props) => {
  const { operation } = props

  const { showModal } = useModal(DeleteContractModal, { ...props })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='negative'
          onClick={showModal}
          disabled={disabled}
          data-testid='delete-contract-button'
        >
          Delete
        </Button>
      )}
    />
  )
}

export default DeleteContractButton
