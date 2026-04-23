import React from 'react'
import { Note, NoteFragment } from '@staff-portal/notes'

export interface Props {
  entity: NoteFragment
}

const NoteRecordContent = ({ entity }: Props) => {
  const {
    id: noteId,
    title,
    attachment,
    operations: { removeNoteAttachment: removeNoteAttachmentOperation }
  } = entity

  return (
    <Note>
      <Note.Header>
        <Note.Title title={title} />
      </Note.Header>

      <Note.Body>
        <Note.Content note={entity} />
      </Note.Body>

      {attachment && (
        <Note.Attachment
          noteId={noteId}
          attachment={attachment}
          removeNoteAttachmentOperation={removeNoteAttachmentOperation}
        />
      )}
    </Note>
  )
}

export default NoteRecordContent
