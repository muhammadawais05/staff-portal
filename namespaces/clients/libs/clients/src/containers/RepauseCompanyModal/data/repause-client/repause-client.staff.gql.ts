import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RepauseClientDocument,
  RepauseClientMutation
} from './repause-client.staff.gql.types'

export const REPAUSE_CLIENT: typeof RepauseClientDocument = gql`
  mutation RepauseClient($input: RepauseClientInput!) {
    repauseClient(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRepauseClient = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RepauseClientMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(REPAUSE_CLIENT, {
    onCompleted,
    onError
  })
