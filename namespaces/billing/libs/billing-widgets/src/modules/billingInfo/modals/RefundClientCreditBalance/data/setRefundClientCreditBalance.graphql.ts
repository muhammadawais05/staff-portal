import gql from 'graphql-tag'

export default gql`
  mutation SetRefundClientCreditBalance(
    $input: RefundClientCreditBalanceInput!
  ) {
    refundClientCreditBalance(input: $input) {
      notice
      success
      errors {
        code
        key
        message
      }
    }
  }
`
