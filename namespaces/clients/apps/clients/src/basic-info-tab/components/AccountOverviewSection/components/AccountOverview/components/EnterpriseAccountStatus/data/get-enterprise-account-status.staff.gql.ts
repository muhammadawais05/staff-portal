import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCompanyOverviewEnterpriseAccountStatus($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        enterpriseAccountStatus {
          status
        }
      }
    }
  }
`
