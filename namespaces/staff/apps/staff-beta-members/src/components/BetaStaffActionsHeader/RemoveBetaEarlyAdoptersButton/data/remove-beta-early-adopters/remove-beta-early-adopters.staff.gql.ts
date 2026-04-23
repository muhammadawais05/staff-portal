import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveBetaEarlyAdoptersDocument,
  RemoveBetaEarlyAdoptersMutation,
  RemoveBetaEarlyAdoptersMutationVariables
} from './remove-beta-early-adopters.staff.gql.types'

export const REMOVE_BETA_EARLY_ADOPTERS: typeof RemoveBetaEarlyAdoptersDocument = gql`
  mutation RemoveBetaEarlyAdopters($staffIds: [ID!]!) {
    removeBetaEarlyAdopters(input: { staffIds: $staffIds }) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveBetaEarlyAdopters = (
  options?: MutationHookOptions<
    RemoveBetaEarlyAdoptersMutation,
    RemoveBetaEarlyAdoptersMutationVariables
  >
) => {
  const [removeBetaEarlyAdopters, { loading }] = useMutation(
    REMOVE_BETA_EARLY_ADOPTERS,
    options
  )

  return {
    removeBetaEarlyAdopters: (staffIds: string[]) =>
      removeBetaEarlyAdopters({ variables: { staffIds } }),
    loading
  }
}
