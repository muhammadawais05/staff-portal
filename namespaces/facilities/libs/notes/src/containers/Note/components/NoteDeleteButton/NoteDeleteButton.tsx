import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Button, Trash16 } from '@toptal/picasso'

import RemoveNoteModal from '../RemoveNoteModal/RemoveNoteModal'

export interface NoteDeleteButtonProps {
  noteId: string
  title: string
  removeNoteOperation: OperationType
  onDelete?: () => void
}

const NoteDeleteButton = ({
  noteId,
  title,
  removeNoteOperation,
  onDelete
}: NoteDeleteButtonProps) => {
  const { showModal } = useModal(RemoveNoteModal, { noteId, title, onDelete })

  return (
    <>
      <Operation
        operation={removeNoteOperation}
        render={disabled => (
          <Button.Circular
            disabled={disabled}
            variant='flat'
            icon={<Trash16 />}
            onClick={showModal}
            aria-label='Delete Note'
          />
        )}
      />
    </>
  )
}

export default NoteDeleteButton
