import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import DeleteStaffModal from '../../../../../../../../components/DeleteStaffModal/DeleteStaffModal'

export interface Props {
  staffId: string
  fullName: string
  operation: OperationType
}

const DeleteStaffButton = ({ staffId, fullName, operation }: Props) => {
  const { showModal } = useModal(DeleteStaffModal, {
    staffId,
    fullName
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          disabled={disabled}
          variant='negative'
          onClick={showModal}
          data-testid='delete-staff-button'
        >
          Delete
        </Button>
      )}
    />
  )
}

export default DeleteStaffButton
