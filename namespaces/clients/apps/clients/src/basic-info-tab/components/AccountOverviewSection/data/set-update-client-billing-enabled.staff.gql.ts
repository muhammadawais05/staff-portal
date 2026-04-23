import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SetUpdateClientBillingEnabled(
    $input: UpdateClientBillingEnabledInput!
  ) {
    updateClientBillingEnabled(input: $input) {
      client {
        id
        billingOptionsUpdateEnabled
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
