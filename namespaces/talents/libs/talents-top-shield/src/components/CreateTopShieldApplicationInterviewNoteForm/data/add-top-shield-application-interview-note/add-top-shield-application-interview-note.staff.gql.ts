import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { AddTopShieldApplicationInterviewNoteDocument } from './add-top-shield-application-interview-note.staff.gql.types'

export const CREATE_COACHING_ENGAGEMENT_NOTE = gql`
  mutation AddTopShieldApplicationInterviewNote(
    $input: AddTopShieldApplicationInterviewNoteMutationInput!
  ) {
    addTopShieldApplicationInterviewNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTopShieldApplicationInterviewNote = ({
  onError
}: {
  onError?: (error: Error) => void
}) => useMutation(AddTopShieldApplicationInterviewNoteDocument, { onError })
