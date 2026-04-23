import { gql } from '@apollo/client'

export default gql`
  query GetDownloadExpectedCommissionsOperationQuery {
    viewer {
      operations {
        downloadExpectedCommissions {
          ...OperationItem
        }
      }
    }
  }
`
