import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResendContractDocument,
  ResendContractMutation
} from './resend-contract.staff.gql.types'

export const RESEND_CONTRACT: typeof ResendContractDocument = gql`
  mutation ResendContract($input: ResendContractInput!) {
    resendContract(input: $input) {
      contract {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResendContract = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ResendContractMutation) => void
}) =>
  useMutation(RESEND_CONTRACT, {
    onError,
    onCompleted
  })
