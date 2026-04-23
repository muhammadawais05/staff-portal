import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetMatchersForVertical($verticalId: ID!) {
    node(id: $verticalId) {
      ... on Vertical {
        clientMatchers {
          nodes {
            id
            fullName
          }
          totalCount
        }
      }
    }
  }
`
