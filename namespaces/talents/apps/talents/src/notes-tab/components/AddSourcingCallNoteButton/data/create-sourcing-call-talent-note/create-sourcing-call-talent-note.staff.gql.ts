import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateSourcingCallTalentNoteDocument,
  CreateSourcingCallTalentNoteMutation
} from './create-sourcing-call-talent-note.staff.gql.types'

export const CREATE_SOURCING_CALL_TALENT_NOTE: typeof CreateSourcingCallTalentNoteDocument = gql`
  mutation CreateSourcingCallTalentNote(
    $input: CreateSourcingCallTalentNoteInput!
  ) {
    createSourcingCallTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateSourcingCallTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateSourcingCallTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_SOURCING_CALL_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
