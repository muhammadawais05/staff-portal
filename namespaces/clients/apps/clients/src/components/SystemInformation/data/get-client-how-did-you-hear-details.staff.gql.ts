import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientHowDidYouHearDetails($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        howDidYouHearDetails
      }
    }
  }
`
