import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  WithdrawAvailabilityRequestDocument,
  WithdrawAvailabilityRequestMutation
} from './withdraw-availability-request.staff.gql.types'

export const WITHDRAW_AVAILABILITY_REQUEST = gql`
  mutation WithdrawAvailabilityRequest(
    $input: WithdrawAvailabilityRequestInput!
  ) {
    withdrawAvailabilityRequest(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useWithdrawAvailabilityRequest = ({
  onError,
  onCompleted
}: {
  onError?: (error: Error) => void
  onCompleted?: (data: WithdrawAvailabilityRequestMutation) => void
}) => useMutation(WithdrawAvailabilityRequestDocument, { onError, onCompleted })
