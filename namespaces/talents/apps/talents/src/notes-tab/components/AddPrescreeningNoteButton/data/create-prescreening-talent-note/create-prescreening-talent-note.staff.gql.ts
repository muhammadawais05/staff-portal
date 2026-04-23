import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreatePrescreeningTalentNoteDocument,
  CreatePrescreeningTalentNoteMutation
} from './create-prescreening-talent-note.staff.gql.types'

export const CREATE_PRESCREENING_TALENT_NOTE: typeof CreatePrescreeningTalentNoteDocument = gql`
  mutation CreatePrescreeningTalentNote(
    $input: CreatePrescreeningTalentNoteInput!
  ) {
    createPrescreeningTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreatePrescreeningTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreatePrescreeningTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_PRESCREENING_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
