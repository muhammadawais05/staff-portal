import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ClaimClientEnterprise($input: ClaimClientEnterpriseInput!) {
    claimClientEnterprise(input: $input) {
      client {
        id
      }
      emailTemplate {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
