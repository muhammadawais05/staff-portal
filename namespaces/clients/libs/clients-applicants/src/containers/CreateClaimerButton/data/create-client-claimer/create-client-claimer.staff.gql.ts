import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateClientClaimerDocument,
  CreateClientClaimerMutation
} from './create-client-claimer.staff.gql.types'

export default gql`
  mutation CreateClientClaimer($clientId: ID!) {
    createClientClaimer(input: { clientId: $clientId }) {
      ...MutationResultFragment
      nextActionName
      pendingCallbackRequest {
        id
        type
      }
      emailTemplate {
        id
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateClientClaimer = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateClientClaimerMutation) => void
  onError?: (error: Error) => void
} = {}) => useMutation(CreateClientClaimerDocument, { onCompleted, onError })
