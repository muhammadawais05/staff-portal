import { gql } from '@apollo/client'

export default gql`
  query GetExperiments {
    experiments {
      poLines {
        enabled
      }
    }
  }
`
