import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RejectClientDocument,
  RejectClientMutation
} from './reject-client.staff.gql.types'

export const REJECT_CLIENT: typeof RejectClientDocument = gql`
  mutation RejectClient($input: RejectClientInput!) {
    rejectClient(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectClient = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RejectClientMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(REJECT_CLIENT, {
    onCompleted,
    onError
  })
