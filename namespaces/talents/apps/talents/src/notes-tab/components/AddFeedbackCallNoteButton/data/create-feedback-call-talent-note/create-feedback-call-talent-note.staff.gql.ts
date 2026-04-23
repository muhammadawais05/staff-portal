import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateFeedbackCallTalentNoteDocument,
  CreateFeedbackCallTalentNoteMutation
} from './create-feedback-call-talent-note.staff.gql.types'

export const CREATE_FEEDBACK_CALL_TALENT_NOTE: typeof CreateFeedbackCallTalentNoteDocument = gql`
  mutation CreateFeedbackCallTalentNote(
    $input: CreateFeedbackCallTalentNoteInput!
  ) {
    createFeedbackCallTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateFeedbackCallTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateFeedbackCallTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_FEEDBACK_CALL_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
