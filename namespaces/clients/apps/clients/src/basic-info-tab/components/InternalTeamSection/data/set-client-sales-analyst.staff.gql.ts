import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetClientSalesAnalyst($input: UpdateClientSalesAnalystInput!) {
    updateClientSalesAnalyst(input: $input) {
      client {
        id
        salesAnalyst {
          ...StaffUserFragment
        }
      }
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
`
