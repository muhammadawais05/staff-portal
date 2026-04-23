import { Button, Pencil16 } from '@toptal/picasso'
import React, { SyntheticEvent } from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { EditItemAction } from '@staff-portal/ui'

export interface NoteEditButtonProps {
  noteId: string
  editNoteOperation: OperationType
  onEditClick?: (event: SyntheticEvent<HTMLButtonElement>) => void
  loading?: boolean
}

const NoteEditButton = ({
  noteId,
  editNoteOperation,
  loading,
  onEditClick
}: NoteEditButtonProps) => {
  return (
    <Operation
      operation={editNoteOperation}
      render={disabled => (
        <Button.Circular
          disabled={disabled}
          loading={loading}
          variant='flat'
          icon={<Pencil16 />}
          onClick={onEditClick}
          data-id={noteId}
          data-action={EditItemAction.Open}
          aria-label='Edit Note'
          data-testid='edit-note-button'
        />
      )}
    />
  )
}

export default NoteEditButton
