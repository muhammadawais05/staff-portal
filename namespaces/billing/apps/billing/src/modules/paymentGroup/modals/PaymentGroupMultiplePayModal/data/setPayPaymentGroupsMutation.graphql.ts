import { gql } from '@apollo/client'

export default gql`
  mutation SetPayPaymentGroups($input: PayPaymentGroupsInput!) {
    payPaymentGroups(input: $input) {
      notice
      success
      errors {
        message
        code
        key
      }
    }
  }
`
