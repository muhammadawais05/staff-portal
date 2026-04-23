import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CallClientDocument,
  CallClientMutation
} from './use-call-client.staff.gql.types'

export default gql`
  mutation CallClient($input: CallClientInput!) {
    callClient(input: $input) {
      ...MutationResultFragment
      externalCallUrl
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCallClient = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: CallClientMutation) => void
}) =>
  useMutation(CallClientDocument, {
    onError,
    onCompleted
  })
