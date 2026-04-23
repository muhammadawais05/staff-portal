import { gql } from '@apollo/client'

export default gql`
  mutation RecordUnappliedCash($input: RecordUnappliedCashInput!) {
    recordUnappliedCash(input: $input) {
      clientMutationId
      success
      errors {
        ...UserErrorFragment
      }
    }
  }
`
