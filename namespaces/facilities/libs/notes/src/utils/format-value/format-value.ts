import { Item } from '@toptal/picasso/Autocomplete'
import {
  AutocompleteEdge,
  NoteAnswerInput,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'

type ValueType = { [key: string]: unknown } | AutocompleteEdge[] | string | null

export const formatValue = (
  kind: NoteQuestionKind,
  value?: ValueType
): NoteAnswerInput['value'] => {
  if (!value) {
    // Return null instead of undefined to remove the value when editing a note.
    return null
  }

  switch (kind) {
    case NoteQuestionKind.DATE: {
      // In some cases sending an array doesn't work, ex. Log sales call.
      // Because of that, we need to send the value as a string.
      // To make it work, we need to convert to a value supported by Graphql - Scalars['JSON'].
      return value as NoteAnswerInput['value']
    }
    case NoteQuestionKind.MULTIPLE_SKILLS: {
      const tags = value as AutocompleteEdge[]

      return tags.map(({ label }) => label)
    }
    case NoteQuestionKind.FREELANCE_PLATFORMS: {
      const tags = value as Item[]

      return tags.map(({ value: tagValue }) => tagValue)
    }
  }

  return value as NoteAnswerInput['value']
}
