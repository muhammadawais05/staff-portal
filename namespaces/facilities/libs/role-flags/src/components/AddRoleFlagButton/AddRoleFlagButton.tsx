import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import AddRoleFlagModal from '../AddRoleFlagModal'

export interface Props {
  roleId: string
  fullName: string
  operation: OperationType
}
const AddRoleFlagButton = ({ roleId, fullName, operation }: Props) => {
  const { showModal } = useModal(AddRoleFlagModal, { roleId, fullName })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          size='small'
          variant='secondary'
          data-testid='add-role-flag-button'
          onClick={showModal}
        >
          Add Flag
        </Button>
      )}
    />
  )
}

export default AddRoleFlagButton
