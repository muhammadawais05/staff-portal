import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetAvailableJobs($companyRepresentativeId: ID!) {
    node(id: $companyRepresentativeId) {
      ... on CompanyRepresentative {
        id
        jobs(filter: { available: true }) {
          nodes {
            id
            title
          }
          __typename
        }
      }
    }
  }
`
