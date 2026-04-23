import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveCallbackRequestDocument } from './remove-call-request.staff.gql.types'

export const REMOVE_CALL_REQUEST: typeof RemoveCallbackRequestDocument = gql`
  mutation RemoveCallbackRequest($input: RemoveCallbackRequestInput!) {
    removeCallbackRequest(input: $input) {
      callbackRequest {
        id
        status
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveCallRequest = ({
  onError
}: {
  onError: (error: Error) => void
}) => {
  const [removeCallRequest] = useMutation(REMOVE_CALL_REQUEST, {
    onError
  })

  return {
    removeCallRequest: (id: string, comment: string) => {
      return removeCallRequest({
        variables: { input: { callbackRequestId: id, comment } }
      })
    }
  }
}
