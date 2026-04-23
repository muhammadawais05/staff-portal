import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  DestroyContractDocument,
  DestroyContractMutation
} from './destroy-contract.staff.gql.types'

export const DESTROY_CONTRACT: typeof DestroyContractDocument = gql`
  mutation DestroyContract($input: DestroyContractInput!) {
    destroyContract(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDestroyContract = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: DestroyContractMutation) => void
}) =>
  useMutation(DESTROY_CONTRACT, {
    onError,
    onCompleted
  })
