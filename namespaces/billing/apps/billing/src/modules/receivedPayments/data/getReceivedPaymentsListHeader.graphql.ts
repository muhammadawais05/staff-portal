import { gql } from '@apollo/client'

export default gql`
  query GetReceivedPaymentsListHeader {
    viewer {
      me {
        operations {
          downloadRolePaymentHistory {
            callable
            messages
          }
        }
      }
      operations {
        downloadCommissions {
          ...OperationItem
        }
      }
      projectedCommissions {
        available
      }
    }
  }
`
