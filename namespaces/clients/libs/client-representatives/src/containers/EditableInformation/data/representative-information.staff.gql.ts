import { gql } from '@staff-portal/data-layer-service'

export const GET_REPRESENTATIVE_INFORMATION = gql`
  query GetRepresentativeInformation($representativeId: ID!) {
    node(id: $representativeId) {
      ... on CompanyRepresentative {
        id
        information
      }
    }
  }
`
