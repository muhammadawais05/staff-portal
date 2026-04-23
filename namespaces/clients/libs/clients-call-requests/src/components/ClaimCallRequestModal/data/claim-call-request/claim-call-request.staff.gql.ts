import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ClaimCallbackRequestDocument,
  ClaimCallbackRequestMutation
} from './claim-call-request.staff.gql.types'

export const CLAIM_CALL_REQUEST: typeof ClaimCallbackRequestDocument = gql`
  mutation ClaimCallbackRequest($input: ClaimCallbackRequestInput!) {
    claimCallbackRequest(input: $input) {
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

export const useClaimCallRequest = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: ClaimCallbackRequestMutation) => void
  onError: (error: Error) => void
}) => useMutation(CLAIM_CALL_REQUEST, { onCompleted, onError })
