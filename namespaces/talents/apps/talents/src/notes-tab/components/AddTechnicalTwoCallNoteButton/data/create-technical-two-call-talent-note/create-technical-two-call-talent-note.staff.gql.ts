import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateTechnicalTwoCallTalentNoteDocument,
  CreateTechnicalTwoCallTalentNoteMutation
} from './create-technical-two-call-talent-note.staff.gql.types'

export const CREATE_TECHNICAL_TWO_CALL_TALENT_NOTE: typeof CreateTechnicalTwoCallTalentNoteDocument = gql`
  mutation CreateTechnicalTwoCallTalentNote(
    $input: CreateTechnicalTwoCallTalentNoteInput!
  ) {
    createTechnicalTwoCallTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTechnicalTwoCallTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateTechnicalTwoCallTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_TECHNICAL_TWO_CALL_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
