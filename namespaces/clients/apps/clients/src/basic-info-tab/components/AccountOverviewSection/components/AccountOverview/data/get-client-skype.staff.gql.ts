import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientSkype($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        contact {
          id
          contacts(filter: { type: [SKYPE] }) {
            nodes {
              id
              type
              value
            }
          }
        }
      }
    }
  }
`
