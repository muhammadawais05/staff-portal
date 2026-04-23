import { gql } from '@apollo/client'

export default gql`
  query GetClientsToConsolidate($id: ID!) {
    node(id: $id) {
      ... on Client {
        hierarchy {
          clients {
            nodes {
              id
              fullName
              invoices(filter: { consolidatable: true }) {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`
