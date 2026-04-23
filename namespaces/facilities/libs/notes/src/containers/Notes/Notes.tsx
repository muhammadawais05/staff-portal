import { Typography, Container } from '@toptal/picasso'
import React, { useCallback, useMemo } from 'react'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useUserTimeZone } from '@staff-portal/current-user'
import { ActivityFragment } from '@staff-portal/activities'
import {
  EditItemAction,
  EditItemOptions,
  EditItemsList
} from '@staff-portal/ui'

import { NoteFragment } from '../../data/note-fragment'
import { ActivityNoteItem, NoteItem } from './components'

const getItemKey = ({ id }: NoteFragment | ActivityFragment) => id

export interface Props {
  commentRequired?: boolean
  editSubmitText?: string
  notes?: (NoteFragment | ActivityFragment)[]
  notFoundMessage?: string
  onUpdate?: () => void
  verticalId?: string
  refetchNotes: () => void
}

const Notes = ({
  commentRequired,
  editSubmitText,
  notes,
  notFoundMessage = 'Currently, there are no notes.',
  onUpdate,
  verticalId,
  refetchNotes
}: Props) => {
  const userTimeZone = useUserTimeZone()
  const { getFormKeys, removeForm } = usePersistentFormContext()

  const handleActionClick = (key: string, action?: EditItemAction) => {
    if (key && action === EditItemAction.Close) {
      removeForm({ nodeId: key })
    }
  }

  const renderItems = useCallback(
    (
      note: NoteFragment | ActivityFragment,
      { open, onActionClick, index }: EditItemOptions
    ) => {
      let content = null

      if (note.__typename === 'Note') {
        content = (
          <NoteItem
            commentRequired={commentRequired}
            editSubmitText={editSubmitText}
            open={open}
            note={note}
            timeZone={userTimeZone}
            verticalId={verticalId}
            onDelete={refetchNotes}
            onClose={onActionClick}
            onOpen={onActionClick}
            onUpdate={onUpdate}
          />
        )
      }

      if (note.__typename === 'Activity') {
        content = (
          <ActivityNoteItem
            note={note}
            timeZone={userTimeZone}
            onDelete={refetchNotes}
            onEdit={refetchNotes}
          />
        )
      }

      const marginBottom =
        notes?.length && index === notes?.length - 1 ? undefined : 'medium'

      return <Container bottom={marginBottom}>{content}</Container>
    },
    [refetchNotes, userTimeZone, verticalId, commentRequired, notes] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const defaultKeys = useMemo(() => getFormKeys(), [getFormKeys])

  return (
    <Typography as='span' size='medium'>
      <EditItemsList
        items={notes}
        notFoundMessage={notFoundMessage}
        renderItem={renderItems}
        getItemKey={getItemKey}
        onActionClick={handleActionClick}
        defaultKeys={defaultKeys}
      />
    </Typography>
  )
}

export default Notes
