import { Entry as ChroniclesEntry } from '@staff-portal/chronicles'
import { NoteFragment } from '@staff-portal/notes'

import { TimelineEmailMessageFragment } from './data/timeline-email-message-fragment/timeline-email-message-fragment.lens.gql.types'

export type ExpandedById = {
  [key: string]: boolean | undefined
}

export enum EntryTypeNames {
  Note,
  HistoryAction,
  Communication
}
export type EntryTypes = ChroniclesEntry | NoteFragment | EmailFragmentWithUsers

export type EmailFragmentWithUsers = TimelineEmailMessageFragment & {
  fromUser?: EmailUser | null
  toUsers: (EmailUser | null | undefined)[]
}

export interface TimelineRecord<
  T extends ChroniclesEntry | NoteFragment | EmailFragmentWithUsers
> {
  type: EntryTypeNames
  id: string
  date: string
  entity: T
}

export type EmailUser = {
  id?: string
  email: string
  fullName?: string
  webResource?: {
    url?: string | null
  }
}

export enum FilterName {
  NOTES = 'notes',
  ACTIONS = 'actions',
  COMMUNICATIONS = 'communications'
}

export type Timeline = {
  [FilterName.NOTES]: TimelineRecord<EntryTypes>[]
  [FilterName.ACTIONS]: TimelineRecord<EntryTypes>[]
  [FilterName.COMMUNICATIONS]: TimelineRecord<EntryTypes>[]
}

export type TimelineFiltersConfig = Record<FilterName, boolean>
