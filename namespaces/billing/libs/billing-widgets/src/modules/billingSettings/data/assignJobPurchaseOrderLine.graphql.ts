import { gql } from '@apollo/client'

export default gql`
  mutation AssignJobPurchaseOrderLine(
    $input: AssignJobPurchaseOrderLineInput!
  ) {
    assignJobPurchaseOrderLine(input: $input) {
      job {
        id
        purchaseOrderLine {
          id
          poLineNumber
          webResource {
            ...WebResourceFragment
          }
        }
        purchaseOrder {
          id
          poNumber
          webResource {
            ...WebResourceFragment
          }
        }
      }
      errors {
        ...UserErrorFragment
      }
      notice
      success
    }
  }
`
