import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateOnlineTestTalentNoteDocument,
  CreateOnlineTestTalentNoteMutation
} from './create-online-test-talent-note.staff.gql.types'

export const CREATE_ONLINE_TEST_TALENT_NOTE: typeof CreateOnlineTestTalentNoteDocument = gql`
  mutation CreateOnlineTestTalentNote(
    $input: CreateOnlineTestTalentNoteInput!
  ) {
    createOnlineTestTalentNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateOnlineTestTalentNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateOnlineTestTalentNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CREATE_ONLINE_TEST_TALENT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
