import { Container, Typography } from '@toptal/picasso'
import React, { ReactNode, SyntheticEvent } from 'react'
import { NoteStatus } from '@staff-portal/graphql/staff'

import Note from '../../../Note'
import { NoteFragment } from '../../../../data/note-fragment'

export interface GenericNoteItemProps {
  note: NoteFragment
  timeZone?: string
  hideActions?: boolean
  verticalId?: string
  loading?: boolean
  onEditClick?: (event?: SyntheticEvent<HTMLButtonElement>) => void
  onNoteDelete?: () => void
  'data-testid'?: string
  children?: ReactNode
}

const GenericNoteItem = ({
  timeZone,
  hideActions,
  note,
  children,
  loading,
  onEditClick,
  onNoteDelete,
  'data-testid': dataTestId
}: GenericNoteItemProps) => {
  const {
    id: noteId,
    creator,
    title,
    updatedAt,
    status,
    createdAt,
    attachment,
    operations: {
      updateNote: updateNoteOperation,
      removeNote: removeNoteOperation,
      removeNoteAttachment: removeNoteAttachmentOperation
    }
  } = note
  const isArchived = status === NoteStatus.ARCHIVED

  return (
    <Typography as='div' color='black'>
      <Note archived={isArchived} data-testid={dataTestId}>
        <Note.Header>
          <Note.Title size='large' title={title} />
          {!hideActions && (
            <Note.Actions>
              <Note.EditButton
                noteId={note.id}
                loading={loading}
                editNoteOperation={updateNoteOperation}
                onEditClick={onEditClick}
              />

              <Container left='xsmall'>
                <Note.DeleteButton
                  noteId={noteId}
                  title={title}
                  removeNoteOperation={removeNoteOperation}
                  onDelete={onNoteDelete}
                />
              </Container>
            </Note.Actions>
          )}
        </Note.Header>

        <Note.Info
          timeZone={timeZone}
          updatedAt={updatedAt}
          createdAt={createdAt}
          author={creator}
        />

        <Note.Body>{children}</Note.Body>

        {attachment && (
          <Note.Attachment
            noteId={noteId}
            attachment={attachment}
            removeNoteAttachmentOperation={removeNoteAttachmentOperation}
          />
        )}
      </Note>
    </Typography>
  )
}

export default GenericNoteItem
