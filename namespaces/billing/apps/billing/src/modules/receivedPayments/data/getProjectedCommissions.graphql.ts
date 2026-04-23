import { gql } from '@apollo/client'

export default gql`
  query GetProjectedCommissions {
    viewer {
      projectedCommissions {
        rules {
          commission
          description
        }
        monthly
        weekly
        yearly
      }
    }
  }
`
