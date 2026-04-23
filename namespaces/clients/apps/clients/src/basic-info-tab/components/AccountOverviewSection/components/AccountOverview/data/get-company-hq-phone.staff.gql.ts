import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCompanyHqPhone($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        companyHqPhone
      }
    }
  }
`
