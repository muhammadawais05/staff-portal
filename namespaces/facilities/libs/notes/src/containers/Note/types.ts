import { NoteFragment } from '../../data/note-fragment'

export type NoteContentType = Pick<
  NoteFragment,
  | 'newSalesCall'
  | 'checklistSalesCall'
  | 'comment'
  | 'answers'
  | 'softSkillRatings'
>
