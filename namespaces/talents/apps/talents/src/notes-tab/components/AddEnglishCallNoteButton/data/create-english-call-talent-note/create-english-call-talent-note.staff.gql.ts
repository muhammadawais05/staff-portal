import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateEnglishCallTalentNoteDocument,
  CreateEnglishCallTalentNoteMutation
} from './create-english-call-talent-note.staff.gql.types'

export const CREATE_ENGLISH_CALL_TALENT_NOTE: typeof CreateEnglishCallTalentNoteDocument = gql`
  mutation CreateEnglishCallTalentNote(
    $input: CreateEnglishCallTalentNoteInput!
  ) {
    createEnglishCallTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateEnglishCallTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateEnglishCallTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_ENGLISH_CALL_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
