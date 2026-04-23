import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  VerifyContractDocument,
  VerifyContractMutation
} from './verify-contract.staff.gql.types'

export const VERIFY_CONTRACT: typeof VerifyContractDocument = gql`
  mutation VerifyContract($input: VerifyContractInput!) {
    verifyContract(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useVerifyContract = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: VerifyContractMutation) => void
}) =>
  useMutation(VERIFY_CONTRACT, {
    onError,
    onCompleted
  })
