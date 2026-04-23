import { TalentNoteType } from '@staff-portal/graphql/staff'
import {
  gql,
  useLazyQuery,
  WatchQueryFetchPolicy
} from '@staff-portal/data-layer-service'
import { NOTE_ANSWER_WITH_OPTIONS_FRAGMENT } from '@staff-portal/notes'
import { useCallback } from 'react'

import { GetDefaultNoteAnswersDocument } from './get-default-note-answers.staff.gql.types'
import type { GetDefaultNoteAnswersQuery } from './get-default-note-answers.staff.gql.types'

export default gql`
  query GetDefaultNoteAnswers(
    $talentId: ID!
    $noteType: TalentNoteType!
    $isForEdit: Boolean!
  ) {
    node(id: $talentId) {
      ... on Talent {
        id
        defaultNoteAnswers(filter: { noteType: $noteType }) {
          nodes {
            ...NoteAnswerWithOptionsFragment
          }
        }
      }
    }
  }

  ${NOTE_ANSWER_WITH_OPTIONS_FRAGMENT}
`

export const useGetDefaultNoteAnswers = ({
  talentId,
  noteType,
  onCompleted,
  fetchPolicy
}: {
  talentId: string
  noteType: TalentNoteType
  onCompleted?: (data: GetDefaultNoteAnswersQuery | undefined) => void
  fetchPolicy?: WatchQueryFetchPolicy
}) => {
  const [fetch, { data, ...restOptions }] = useLazyQuery(
    GetDefaultNoteAnswersDocument,
    {
      variables: { talentId, noteType, isForEdit: false },
      onCompleted,
      fetchPolicy
    }
  )

  const getDefaultNoteAnswers = useCallback(fetch, [fetch])

  return {
    answers: data?.node?.defaultNoteAnswers?.nodes,
    getDefaultNoteAnswers,
    ...restOptions
  }
}
