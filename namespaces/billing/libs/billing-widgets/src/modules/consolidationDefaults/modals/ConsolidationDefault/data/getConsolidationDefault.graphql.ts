import { gql } from '@apollo/client'

export default gql`
  query GetConsolidationDefault($id: ID!) {
    node(id: $id) {
      ... on ConsolidationDefault {
        id
        name
        client {
          fullName
          id
        }
        engagements {
          nodes {
            id
            client {
              id
            }
          }
        }
      }
    }
  }
`
