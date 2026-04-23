import { gql } from '@apollo/client'

export default gql`
  query GetInvoiceForPrepayment($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        id
        cleanAmountToPay
        documentNumber
        invoiceKind
        status
        subjectObject {
          availablePrepaymentBalance
        }
      }
    }
  }
`
