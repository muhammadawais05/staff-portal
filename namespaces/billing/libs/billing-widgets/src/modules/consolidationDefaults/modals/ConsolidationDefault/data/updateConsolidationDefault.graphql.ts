import { gql } from '@apollo/client'

export default gql`
  mutation UpdateConsolidationDefault(
    $input: UpdateConsolidationDefaultInput!
  ) {
    updateConsolidationDefault(input: $input) {
      success
      consolidationDefault {
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
