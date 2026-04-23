import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { AddGeneralTalentCoachingEngagementNoteDocument } from './'

export const ADD_GENERAL_TALENT_COACHING_ENGAGEMENT_NOTE = gql`
  mutation AddGeneralTalentCoachingEngagementNote(
    $input: AddGeneralTalentCoachingEngagementNoteInput!
  ) {
    addGeneralTalentCoachingEngagementNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddGeneralTalentCoachingEngagementNote = ({
  onError
}: {
  onError?: (error: Error) => void
}) => useMutation(AddGeneralTalentCoachingEngagementNoteDocument, { onError })
