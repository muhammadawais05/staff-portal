import React from 'react'
import { Button, Trash16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import DraftJobDeleteModal from '../DraftJobDeleteModal'

export interface Props {
  draftJobId: string
  operation: OperationType
}

const DraftJobDeleteButton = ({ draftJobId, operation }: Props) => {
  const { showModal } = useModal(DraftJobDeleteModal, {
    draftJobId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button.Circular
          disabled={disabled}
          variant='flat'
          icon={<Trash16 />}
          onClick={showModal}
          aria-label='Delete Draft Job'
        />
      )}
    />
  )
}

export default DraftJobDeleteButton
