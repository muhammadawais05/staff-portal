import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddJobMatchingNoteDocument,
  AddJobMatchingNoteMutation
} from './add-job-matching-note.staff.gql.types'

export const ADD_JOB_MATCHING_NOTE: typeof AddJobMatchingNoteDocument = gql`
  mutation AddJobMatchingNote($input: AddJobMatchingNoteInput!) {
    addJobMatchingNote(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddJobMatchingNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AddJobMatchingNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(ADD_JOB_MATCHING_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
