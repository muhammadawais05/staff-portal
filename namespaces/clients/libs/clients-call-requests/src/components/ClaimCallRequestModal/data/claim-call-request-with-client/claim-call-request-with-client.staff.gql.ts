import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ClaimCallbackRequestWithClientDocument,
  ClaimCallbackRequestWithClientMutation
} from './claim-call-request-with-client.staff.gql.types'

export const CLAIM_CALL_REQUEST_WITH_CLIENT: typeof ClaimCallbackRequestWithClientDocument = gql`
  mutation ClaimCallbackRequestWithClient(
    $input: ClaimCallbackRequestWithClientInput!
  ) {
    claimCallbackRequestWithClient(input: $input) {
      ...MutationResultFragment
      callbackRequest {
        id
        client {
          id
          webResource {
            url
          }
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useClaimCallRequestWithClient = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: ClaimCallbackRequestWithClientMutation) => void
  onError: (error: Error) => void
}) => useMutation(CLAIM_CALL_REQUEST_WITH_CLIENT, { onCompleted, onError })
