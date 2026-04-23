import React, { useCallback, SyntheticEvent, useEffect } from 'react'

import Note from '../../../Note'
import { NoteFragment } from '../../../../data/note-fragment'
import EditNoteForm from '../EditNoteForm'
import GenericNoteItem from '../GenericNoteItem'
import { useGetNote } from './data'

export interface NoteItemProps {
  commentRequired?: boolean
  editSubmitText?: string
  note: NoteFragment
  open?: boolean
  timeZone?: string
  hideActions?: boolean
  verticalId?: string
  onDelete?: () => void
  onOpen?: (event?: SyntheticEvent<HTMLButtonElement>) => void
  onClose?: (event?: SyntheticEvent<HTMLButtonElement>) => void
  onUpdate?: () => void
}

const NoteItem = ({
  commentRequired,
  editSubmitText,
  note,
  open,
  timeZone,
  hideActions,
  verticalId,
  onOpen,
  onClose,
  onDelete,
  onUpdate
}: NoteItemProps) => {
  const {
    note: noteForEdit,
    getNote,
    error,
    loading
  } = useGetNote({
    noteId: note.id
  })

  const handleEditClick = useCallback(
    (event?: SyntheticEvent<HTMLButtonElement>) => {
      getNote()
      onOpen?.(event)
    },
    [getNote, onOpen]
  )

  useEffect(() => {
    if (open && !noteForEdit && !loading && !error) {
      getNote()
    }
  }, [error, getNote, loading, noteForEdit, open])

  const isFormVisible = open && !loading

  return (
    <>
      {isFormVisible && noteForEdit && (
        <Note editMode data-testid={`NoteItem-${note.id}`}>
          <EditNoteForm
            commentRequired={commentRequired}
            note={noteForEdit}
            verticalId={verticalId}
            onClose={onClose}
            onComplete={onUpdate}
            submitText={editSubmitText}
          />
        </Note>
      )}

      {!isFormVisible && (
        <GenericNoteItem
          data-testid={`NoteItem-${note.id}`}
          note={note}
          timeZone={timeZone}
          hideActions={hideActions}
          verticalId={verticalId}
          loading={loading}
          onEditClick={handleEditClick}
          onNoteDelete={onDelete}
        >
          <Note.Content note={note} />
        </GenericNoteItem>
      )}
    </>
  )
}

export default NoteItem
