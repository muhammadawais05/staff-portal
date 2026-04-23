import { gql } from '@apollo/client'

export default gql`
  mutation SetCreatePaymentGroup($input: CreatePaymentGroupInput!) {
    createPaymentGroup(input: $input) {
      paymentGroup {
        id
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }
`
