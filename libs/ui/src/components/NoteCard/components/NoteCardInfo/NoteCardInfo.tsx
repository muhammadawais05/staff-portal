import React from 'react'
import { Typography, Note } from '@toptal/picasso'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import NoteCardAuthor, { NoteCreator } from '../NoteCardAuthor'

export interface NoteInfoProps {
  author?: NoteCreator | null
  createdAt: string
  updatedAt: string
  timeZone?: string
}

const NoteCardInfo = ({
  createdAt,
  updatedAt,
  author,
  timeZone
}: NoteInfoProps) => {
  const addedAt = parseAndFormatDateTime(createdAt, { timeZone })
  const addedAtPrefix = author ? 'added on' : 'Added on'

  return (
    <Note.Subtitle>
      {author && (
        <>
          <NoteCardAuthor author={author} />{' '}
        </>
      )}
      <Typography as='span'>
        {addedAtPrefix} {addedAt}
      </Typography>
      {createdAt !== updatedAt && (
        <Typography as='span'>
          {' '}
          (updated on {parseAndFormatDateTime(updatedAt, { timeZone })})
        </Typography>
      )}
    </Note.Subtitle>
  )
}

export default NoteCardInfo
