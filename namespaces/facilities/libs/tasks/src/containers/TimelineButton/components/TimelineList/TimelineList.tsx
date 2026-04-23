import React from 'react'
import { Entry, Timeline } from '@staff-portal/chronicles'
import { NoteFragment } from '@staff-portal/notes'

import {
  ExpandedById,
  EntryTypes,
  TimelineRecord,
  EmailFragmentWithUsers,
  EntryTypeNames
} from '../../types'
import HistoryActionRecord from '../HistoryActionRecord'
import NoteRecord from '../NoteRecord'
import CommunicationRecord from '../CommunicationRecord'

export interface Props {
  entries: TimelineRecord<EntryTypes>[]
  expandedById: ExpandedById
  onExpandClick: (id: string) => void
}

const TimelineList = ({ entries, expandedById, onExpandClick }: Props) => (
  <Timeline>
    {entries.map((entry, index) => {
      const props = {
        key: entry.id,
        expanded: Boolean(expandedById[entry.id]),
        hasConnector: index < entries.length - 1,
        onExpandClick
      }

      switch (entry.type) {
        case EntryTypeNames.HistoryAction:
          return (
            <HistoryActionRecord entity={entry.entity as Entry} {...props} />
          )
        case EntryTypeNames.Note:
          return (
            <NoteRecord
              entry={entry as TimelineRecord<NoteFragment>}
              {...props}
            />
          )
        case EntryTypeNames.Communication:
          return (
            <CommunicationRecord
              entry={entry as TimelineRecord<EmailFragmentWithUsers>}
              {...props}
            />
          )
      }
    })}
  </Timeline>
)

export default TimelineList
