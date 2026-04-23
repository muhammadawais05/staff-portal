import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateTechnicalOneCallTalentNoteDocument,
  CreateTechnicalOneCallTalentNoteMutation
} from './create-technical-one-call-talent-note.staff.gql.types'

export const CREATE_TECHNICAL_ONE_CALL_TALENT_NOTE: typeof CreateTechnicalOneCallTalentNoteDocument = gql`
  mutation CreateTechnicalOneCallTalentNote(
    $input: CreateTechnicalOneCallTalentNoteInput!
  ) {
    createTechnicalOneCallTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTechnicalOneCallTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateTechnicalOneCallTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_TECHNICAL_ONE_CALL_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
