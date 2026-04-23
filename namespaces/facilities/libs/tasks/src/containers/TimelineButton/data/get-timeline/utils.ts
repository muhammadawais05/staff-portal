import { Entry as ChroniclesEntry } from '@staff-portal/chronicles'
import { NoteFragment } from '@staff-portal/notes'

import {
  TimelineRecord,
  EmailFragmentWithUsers,
  EntryTypeNames
} from '../../types'

export const getTimelineRecordsFromNotes = (
  notes: NoteFragment[]
): TimelineRecord<NoteFragment>[] =>
  notes.map(note => ({
    type: EntryTypeNames.Note,
    id: note.id,
    date: note.createdAt,
    entity: note
  }))

export const getTimelineRecordsFromHistoryActions = (
  historyActions: ChroniclesEntry[]
): TimelineRecord<ChroniclesEntry>[] =>
  historyActions.map(historyAction => ({
    type: EntryTypeNames.HistoryAction,
    id: historyAction.performedAction.id,
    date: historyAction.performedAction.occurredAt,
    entity: historyAction
  }))

export const getTimelineRecordsFromCommunications = (
  communications: EmailFragmentWithUsers[]
): TimelineRecord<EmailFragmentWithUsers>[] =>
  communications.map(communication => ({
    type: EntryTypeNames.Communication,
    id: communication.id,
    date: communication.sentAt,
    entity: communication
  }))
