import { Container, ShowMore } from '@toptal/picasso'
import React from 'react'
import { ActivityFragment } from '@staff-portal/activities'
import { NO_VALUE } from '@staff-portal/config'

import { getActivityItems } from './utils/get-activity-items'
import * as S from './styles'
import NoteField from '../NoteField'

export interface ActivityNoteContentProps {
  note: ActivityFragment
}

const ActivityNoteContent = ({ note }: ActivityNoteContentProps) => {
  const DETAILS_LENGTH_BEFORE_SHOW_MORE = 100
  const items = getActivityItems(note)

  return (
    <>
      {items.map(item => (
        <NoteField key={item.key} question={item.key}>
          {item.value ?? NO_VALUE}
        </NoteField>
      ))}

      <Container css={S.noteDetails}>
        {note.details.length > DETAILS_LENGTH_BEFORE_SHOW_MORE ? (
          <ShowMore rows={1}>{note.details}</ShowMore>
        ) : (
          <>{note.details}</>
        )}
      </Container>
    </>
  )
}

export default ActivityNoteContent
