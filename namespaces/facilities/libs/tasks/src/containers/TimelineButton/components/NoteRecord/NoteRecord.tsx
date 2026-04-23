import React, { Fragment, memo } from 'react'
import { Typography } from '@toptal/picasso'
import { Pencil16 } from '@toptal/picasso/Icon'
import { HistoryEntryRow } from '@staff-portal/chronicles'
import { Note, NoteFragment } from '@staff-portal/notes'

import { TimelineRecord } from '../../types'
import NoteRecordContent from '../NoteRecordContent'

export type Props = {
  entry: TimelineRecord<NoteFragment>
  expanded: boolean
  hasConnector: boolean
  onExpandClick: (id: string) => void
}

const NoteRecord = ({
  entry: { id: entryId, date, entity },
  expanded,
  hasConnector,
  onExpandClick
}: Props) => (
  <HistoryEntryRow
    id={entryId}
    icon={<Pencil16 />}
    content={[
      <Fragment key='add'>
        {entity.creator && <Note.Author author={entity.creator} />}
        <Typography as='span'>
          {entity.creator ? ' added' : 'Added'} a note
        </Typography>
      </Fragment>
    ]}
    comment={<NoteRecordContent entity={entity} />}
    date={date}
    expanded={expanded}
    hasConnector={hasConnector}
    onExpandClick={onExpandClick}
  />
)

export default memo(NoteRecord)
