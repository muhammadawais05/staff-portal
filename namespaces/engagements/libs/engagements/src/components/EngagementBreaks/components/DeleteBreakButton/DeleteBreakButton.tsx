import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import DeleteBreakModal from '../DeleteBreakModal'

export type Props = {
  engagementId: string
  engagementBreakId: string
  operation: OperationType
}

const DeleteBreakButton = ({
  engagementId,
  engagementBreakId,
  operation
}: Props) => {
  const { showModal } = useModal(DeleteBreakModal, {
    engagementId,
    engagementBreakId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          data-testid='DeleteBreakButton-button'
        >
          Delete
        </Button>
      )}
    />
  )
}

export default DeleteBreakButton
