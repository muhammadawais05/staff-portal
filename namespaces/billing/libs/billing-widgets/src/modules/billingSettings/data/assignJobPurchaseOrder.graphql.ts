import { gql } from '@apollo/client'

export default gql`
  mutation AssignJobPurchaseOrder($input: AssignJobPurchaseOrderInput!) {
    assignJobPurchaseOrder(input: $input) {
      job {
        id
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
