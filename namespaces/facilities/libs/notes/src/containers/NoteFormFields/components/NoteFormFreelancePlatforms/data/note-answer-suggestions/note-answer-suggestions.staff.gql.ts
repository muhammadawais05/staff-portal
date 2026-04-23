import { gql, useQuery } from '@staff-portal/data-layer-service'

import { NoteAnswerSuggestionsDocument } from './note-answer-suggestions.staff.gql.types'

export const NOTE_ANSWER_SUGGESTIONS: typeof NoteAnswerSuggestionsDocument = gql`
  query NoteAnswerSuggestions {
    noteAnswerSuggestions(filter: { questionKind: FREELANCE_PLATFORMS })
  }
`

export const useNoteAnswerSuggestions = () => {
  const { data, ...restOptions } = useQuery(NOTE_ANSWER_SUGGESTIONS, {
    fetchPolicy: 'cache-first'
  })

  return {
    suggestions: data?.noteAnswerSuggestions,
    ...restOptions
  }
}
