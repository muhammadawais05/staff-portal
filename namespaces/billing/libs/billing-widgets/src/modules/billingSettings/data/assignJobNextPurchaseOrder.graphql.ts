import { gql } from '@apollo/client'

export default gql`
  mutation AssignJobNextPurchaseOrder(
    $input: AssignJobNextPurchaseOrderInput!
  ) {
    assignJobNextPurchaseOrder(input: $input) {
      job {
        id
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
