import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddBetaEarlyAdoptersDocument,
  AddBetaEarlyAdoptersMutation,
  AddBetaEarlyAdoptersMutationVariables
} from './add-beta-early-adopters.staff.gql.types'

export const ADD_BETA_EARLY_ADOPTERS: typeof AddBetaEarlyAdoptersDocument = gql`
  mutation AddBetaEarlyAdopters($staffIds: [ID!]!) {
    addBetaEarlyAdopters(input: { staffIds: $staffIds }) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddBetaEarlyAdopters = (
  options?: MutationHookOptions<
    AddBetaEarlyAdoptersMutation,
    AddBetaEarlyAdoptersMutationVariables
  >
) => {
  const [addBetaEarlyAdopters, { loading }] = useMutation(
    ADD_BETA_EARLY_ADOPTERS,
    options
  )

  return {
    addBetaEarlyAdopters: (staffIds: string[]) =>
      addBetaEarlyAdopters({ variables: { staffIds } }),
    loading
  }
}
