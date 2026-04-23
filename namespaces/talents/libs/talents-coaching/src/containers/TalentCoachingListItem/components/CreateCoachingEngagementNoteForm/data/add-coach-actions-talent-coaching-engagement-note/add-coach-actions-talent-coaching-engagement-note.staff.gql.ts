import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { AddCoachActionsTalentCoachingEngagementNoteDocument } from './'

export const CREATE_COACHING_ENGAGEMENT_NOTE = gql`
  mutation AddCoachActionsTalentCoachingEngagementNote(
    $input: AddCoachActionsTalentCoachingEngagementNoteInput!
  ) {
    addCoachActionsTalentCoachingEngagementNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddCoachActionsTalentCoachingEngagementNote = ({
  onError
}: {
  onError?: (error: Error) => void
}) =>
  useMutation(AddCoachActionsTalentCoachingEngagementNoteDocument, { onError })
