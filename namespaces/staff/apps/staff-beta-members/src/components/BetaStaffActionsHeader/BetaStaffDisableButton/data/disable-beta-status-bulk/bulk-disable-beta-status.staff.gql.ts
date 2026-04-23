import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  BulkDisableBetaDocument,
  BulkDisableBetaMutation,
  BulkDisableBetaMutationVariables
} from './bulk-disable-beta-status.staff.gql.types'

export const BULK_DISABLE_BETA: typeof BulkDisableBetaDocument = gql`
  mutation BulkDisableBeta($staffIds: [ID!]!) {
    bulkDisableBeta(input: { staffIds: $staffIds }) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useBulkDisableBetaStatus = (
  options?: MutationHookOptions<
    BulkDisableBetaMutation,
    BulkDisableBetaMutationVariables
  >
) => {
  const [bulkDisableBeta, { loading }] = useMutation(BULK_DISABLE_BETA, options)

  return {
    bulkDisableBeta: (staffIds: string[]) =>
      bulkDisableBeta({ variables: { staffIds } }),
    loading
  }
}
