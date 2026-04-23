import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreClientDocument,
  RestoreClientMutation
} from './restore-client.staff.gql.types'

export const RESTORE_CLIENT: typeof RestoreClientDocument = gql`
  mutation RestoreClient($input: RestoreClientInput!) {
    restoreClient(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreClient = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RestoreClientMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(RESTORE_CLIENT, {
    onCompleted,
    onError
  })
