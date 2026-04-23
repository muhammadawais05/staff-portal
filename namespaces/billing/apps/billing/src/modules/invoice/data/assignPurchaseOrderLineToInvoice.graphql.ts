import { gql } from '@apollo/client'

export default gql`
  mutation AssignPurchaseOrderLineToInvoice(
    $input: AssignPurchaseOrderLineInput!
  ) {
    assignPurchaseOrderLine(input: $input) {
      success
      errors {
        code
        key
        message
      }
      invoice {
        id
        purchaseOrderLine {
          id
          poLineNumber
          budgetLeft
          purchaseOrder {
            id
            poNumber
            budgetLeft
          }
        }
      }
    }
  }
`
