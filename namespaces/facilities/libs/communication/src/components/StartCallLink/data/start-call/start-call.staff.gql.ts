import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  StartCallDocument,
  StartCallMutation
} from './start-call.staff.gql.types'

export const START_CALL: typeof StartCallDocument = gql`
  mutation StartCall($input: StartCallInput!) {
    startCall(input: $input) {
      ...MutationResultFragment
      notice
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useStartCall = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: StartCallMutation) => void
}) =>
  useMutation(START_CALL, {
    onError,
    onCompleted
  })
