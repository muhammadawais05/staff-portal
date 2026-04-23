import { gql } from '@apollo/client'

export default gql`
  mutation SetChangeCommitment($input: ChangeEngagementCommitmentInput!) {
    changeEngagementCommitment(input: $input) {
      engagement {
        id
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
