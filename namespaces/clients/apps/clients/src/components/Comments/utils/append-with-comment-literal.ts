import { Entry } from '@staff-portal/chronicles'

export const appendWithCommentLiteral = (entries: Entry[]) =>
  entries.map(entry =>
    entry.performedAction.comment
      ? {
          ...entry,
          literals: [...entry.literals, ' with comment:']
        }
      : entry
  )
