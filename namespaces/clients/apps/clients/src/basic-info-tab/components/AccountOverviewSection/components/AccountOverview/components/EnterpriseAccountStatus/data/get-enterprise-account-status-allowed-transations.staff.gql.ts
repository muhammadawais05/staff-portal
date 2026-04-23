import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCompanyOverviewEnterpriseAccountStatusAllowedTransactions(
    $clientId: ID!
  ) {
    node(id: $clientId) {
      ... on Client {
        id
        enterpriseAccountStatus {
          allowedTransitions
        }
      }
    }
  }
`
