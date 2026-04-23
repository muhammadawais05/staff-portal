import { gql } from '@apollo/client'

export default gql`
  mutation SetPayPayment($input: PayPaymentInput!) {
    payPayment(input: $input) {
      success
      errors {
        code
        key
        message
      }
      payment {
        id
        balanceDue
        documentNumber
        status
        operations {
          applyUnallocatedMemorandumsToCommercialDocument {
            ...OperationItem
          }
          payPayment {
            ...OperationItem
          }
        }
      }
    }
  }
`
