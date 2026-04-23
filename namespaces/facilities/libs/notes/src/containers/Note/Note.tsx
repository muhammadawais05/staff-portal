import { ContainerProps } from '@toptal/picasso'
import React, { FunctionComponent } from 'react'
import { NoteCard, NoteCardStructure } from '@staff-portal/ui'

import ActivityNoteContent from './components/ActivityNoteContent'
import ActivityNoteDeleteButton from './components/ActivityNoteDeleteButton'
import ActivityNoteEditButton from './components/ActivityNoteEditButton'
import NoteAttachment from './components/NoteAttachment'
import NoteComment from './components/NoteComment'
import NoteContent from './components/NoteContent'
import NoteDeleteButton from './components/NoteDeleteButton'
import NoteEditButton from './components/NoteEditButton'
import * as S from './styles'

export interface NoteStructure extends NoteCardStructure {
  ActivityContent: typeof ActivityNoteContent
  ActivityNoteDeleteButton: typeof ActivityNoteDeleteButton
  ActivityNoteEditButton: typeof ActivityNoteEditButton
  Attachment: typeof NoteAttachment
  Comment: typeof NoteComment
  Content: typeof NoteContent
  DeleteButton: typeof NoteDeleteButton
  EditButton: typeof NoteEditButton
}

export interface NoteProps extends ContainerProps {
  archived?: boolean
  editMode?: boolean
}

/**
 * Note card for `Note` entity
 */
const Note: FunctionComponent<NoteProps> & NoteStructure = ({
  archived = false,
  editMode = false,
  ...rest
}) => (
  <NoteCard
    css={[archived && S.archivedNoteContent]}
    editMode={editMode}
    {...rest}
  />
)

Note.Actions = NoteCard.Actions
Note.ActivityContent = ActivityNoteContent
Note.ActivityNoteDeleteButton = ActivityNoteDeleteButton
Note.ActivityNoteEditButton = ActivityNoteEditButton
Note.Attachment = NoteAttachment
Note.Author = NoteCard.Author
Note.Body = NoteCard.Body
Note.Comment = NoteComment
Note.Content = NoteContent
Note.DeleteButton = NoteDeleteButton
Note.EditButton = NoteEditButton
Note.Header = NoteCard.Header
Note.Info = NoteCard.Info
Note.Title = NoteCard.Title

export default Note
