import { UpdateJobSalesOwnerInput } from '@staff-portal/graphql/staff'
import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateJobSalesOwnerDocument,
  UpdateJobSalesOwnerMutation,
  UpdateJobSalesOwnerMutationVariables
} from './update-job-sales-owner.staff.gql.types'

export const UPDATE_JOB_SALES_OWNER: typeof UpdateJobSalesOwnerDocument = gql`
  mutation UpdateJobSalesOwner($input: UpdateJobSalesOwnerInput!) {
    updateJobSalesOwner(input: $input) {
      job {
        id
        currentSalesOwner {
          owner {
            id
          }
          relationship
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJobSalesOwner = (
  options?: MutationHookOptions<
    UpdateJobSalesOwnerMutation,
    UpdateJobSalesOwnerMutationVariables
  >
) => {
  const [updateJobSalesOwner, { loading }] = useMutation(
    UPDATE_JOB_SALES_OWNER,
    {
      ...options
    }
  )

  return {
    updateJobSalesOwner: (input: UpdateJobSalesOwnerInput) =>
      updateJobSalesOwner({
        variables: { input }
      }),
    loading
  }
}
