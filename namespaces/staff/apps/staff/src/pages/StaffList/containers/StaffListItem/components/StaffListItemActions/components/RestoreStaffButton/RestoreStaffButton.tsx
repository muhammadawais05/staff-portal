import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import RestoreStaffModal from '../../../../../../../../components/RestoreStaffModal/RestoreStaffModal'

export interface Props {
  staffId: string
  fullName: string
  operation: OperationType
}

const RestoreStaffButton = ({ staffId, fullName, operation }: Props) => {
  const { showModal } = useModal(RestoreStaffModal, {
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
          variant='positive'
          onClick={showModal}
          data-testid='restore-staff-button'
        >
          Restore
        </Button>
      )}
    />
  )
}

export default RestoreStaffButton
