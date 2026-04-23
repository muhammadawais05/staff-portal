import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetRepresentativeAbout($representativeId: ID!) {
    node(id: $representativeId) {
      ... on CompanyRepresentative {
        id
        about
      }
    }
  }
`
