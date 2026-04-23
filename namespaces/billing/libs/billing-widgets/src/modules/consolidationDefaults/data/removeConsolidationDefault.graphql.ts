import { gql } from '@apollo/client'

export default gql`
  mutation RemoveConsolidationDefault(
    $input: RemoveConsolidationDefaultInput!
  ) {
    removeConsolidationDefault(input: $input) {
      success
      consolidationDefault {
        id
        name
        deleted
      }
      errors {
        ...UserErrorFragment
      }
    }
  }
`
