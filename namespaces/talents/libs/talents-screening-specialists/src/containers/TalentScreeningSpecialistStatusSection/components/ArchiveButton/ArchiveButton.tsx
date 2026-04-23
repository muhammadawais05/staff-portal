import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import ArchiveModal from '../../../ArchiveModal'

export interface Props {
  assignmentId?: string
  operation?: OperationType
}

const ArchiveButton = ({ assignmentId, operation }: Props) => {
  const { showModal } = useModal(ArchiveModal, {
    assignmentIds: assignmentId ? [assignmentId] : undefined
  })

  if (!assignmentId || !operation) {
    return null
  }

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          data-testid='tss-archive-button'
          variant='secondary'
          size='small'
          onClick={showModal}
          disabled={disabled}
        >
          Archive
        </Button>
      )}
    />
  )
}

export default ArchiveButton
