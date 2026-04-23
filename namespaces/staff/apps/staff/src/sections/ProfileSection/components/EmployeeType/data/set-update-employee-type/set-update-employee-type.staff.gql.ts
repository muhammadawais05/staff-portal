import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdatePaymentsEmployeeType(
    $input: UpdatePaymentsEmployeeTypeInput!
  ) {
    updatePaymentsEmployeeType(input: $input) {
      ...MutationResultFragment
      role {
        id
        ... on Staff {
          paymentsEmployeeType
        }
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
