import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  BulkEnableBetaDocument,
  BulkEnableBetaMutation,
  BulkEnableBetaMutationVariables
} from './bulk-enable-beta-status.staff.gql.types'

export const BULK_ENABLE_BETA: typeof BulkEnableBetaDocument = gql`
  mutation BulkEnableBeta($staffIds: [ID!]!) {
    bulkEnableBeta(input: { staffIds: $staffIds }) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useBulkEnableBetaStatus = (
  options?: MutationHookOptions<
    BulkEnableBetaMutation,
    BulkEnableBetaMutationVariables
  >
) => {
  const [bulkEnableBeta, { loading }] = useMutation(BULK_ENABLE_BETA, options)

  return {
    bulkEnableBeta: (staffIds: string[]) =>
      bulkEnableBeta({ variables: { staffIds } }),
    loading
  }
}
