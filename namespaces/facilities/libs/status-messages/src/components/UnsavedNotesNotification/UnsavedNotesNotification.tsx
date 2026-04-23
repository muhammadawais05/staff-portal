import React, { Fragment } from 'react'
import { Link } from '@staff-portal/navigation'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { StatusMessageNotification } from '@staff-portal/ui'
import { useNoteNotifications, NoteLinks } from '@staff-portal/notes'

interface Props {
  noteLinks: NoteLinks
}

const UnsavedNotesNotification = ({ noteLinks }: Props) => {
  const { untrackAllNotes } = useNoteNotifications()
  const noteLinksValues = Object.values(noteLinks)

  if (!noteLinksValues.length) {
    return null
  }

  return (
    <StatusMessageNotification
      variant='yellow'
      onClose={() => untrackAllNotes()}
    >
      You have unsaved notes on the following pages:{' '}
      {noteLinksValues.map(({ notableId, notableTitle, path }, index) => {
        const { type } = decodeEntityId(notableId)
        const shouldHaveComma = index !== noteLinksValues.length - 1

        return (
          <Fragment key={notableId}>
            <Link href={path}>
              {notableTitle} ({type})
            </Link>
            {shouldHaveComma ? ', ' : '.'}
          </Fragment>
        )
      })}
    </StatusMessageNotification>
  )
}

export default UnsavedNotesNotification
