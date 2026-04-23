import { gql } from '@apollo/client'

export default gql`
  mutation SetPayMultiplePayments($input: PayMultiplePaymentsInput!) {
    payMultiplePayments(input: $input) {
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
