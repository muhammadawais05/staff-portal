import { gql } from '@apollo/client'

export default gql`
  mutation AssignJobNextPurchaseOrderLine(
    $input: AssignJobNextPurchaseOrderLineInput!
  ) {
    assignJobNextPurchaseOrderLine(input: $input) {
      job {
        id
        nextPurchaseOrderLine {
          id
          poLineNumber
          webResource {
            ...WebResourceFragment
          }
        }
        nextPurchaseOrder {
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
