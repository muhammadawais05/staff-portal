import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { ActivityFragment } from '@staff-portal/activities'

import Note from '../../../Note'

export interface ActivityNoteItemProps {
  note: ActivityFragment
  timeZone?: string
  onDelete: () => void
  onEdit: () => void
}

const ActivityNoteItem = ({
  timeZone,
  note,
  onDelete,
  onEdit
}: ActivityNoteItemProps) => {
  const { updatedAt, createdAt, role } = note

  return (
    <Typography as='div' color='black'>
      <Note data-testid={`ActivityNoteItem-${note.id}`}>
        <Note.Header>
          <Note.Title size='large' title='Activity Note' />

          <Note.Actions>
            <Note.ActivityNoteEditButton
              activity={note}
              onEdit={onEdit}
              updateActivityOperation={note.operations.updateActivity}
            />

            <Container left='xsmall'>
              <Note.ActivityNoteDeleteButton
                activityId={note.id}
                onDelete={onDelete}
                removeActivityOperation={note.operations.removeActivity}
              />
            </Container>
          </Note.Actions>
        </Note.Header>

        <Note.Info
          timeZone={timeZone}
          updatedAt={updatedAt}
          createdAt={createdAt}
          author={role}
        />

        <Note.Body>
          <Note.ActivityContent note={note} />
        </Note.Body>
      </Note>
    </Typography>
  )
}

export default ActivityNoteItem
