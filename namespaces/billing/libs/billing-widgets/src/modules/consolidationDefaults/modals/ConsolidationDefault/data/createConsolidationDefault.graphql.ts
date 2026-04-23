import { gql } from '@apollo/client'

export default gql`
  mutation CreateConsolidationDefault(
    $input: CreateConsolidationDefaultInput!
  ) {
    createConsolidationDefault(input: $input) {
      success
      consolidationDefault {
        id
        name
        client {
          id
        }
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
`
