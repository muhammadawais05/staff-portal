import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdatePaymentsFrequency($input: UpdatePaymentsFrequencyInput!) {
    updatePaymentsFrequency(input: $input) {
      ...MutationResultFragment
      role {
        id
        ... on Staff {
          paymentsFrequency
        }
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
