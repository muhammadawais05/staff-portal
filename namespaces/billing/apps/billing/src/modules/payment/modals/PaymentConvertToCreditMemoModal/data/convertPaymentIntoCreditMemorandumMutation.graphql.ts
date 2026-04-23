import { gql } from '@apollo/client'

export const convertPaymentIntoCreditMemorandumMutation = gql`
  mutation convertPaymentIntoCreditMemorandum(
    $input: ConvertPaymentIntoCreditMemorandumInput!
  ) {
    convertPaymentIntoCreditMemorandum(input: $input) {
      payment {
        id
      }
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
