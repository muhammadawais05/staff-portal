import { gql } from '@apollo/client'

export default gql`
  query GetJob($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...BillingSettingsJobFragment
      }
    }
  }
`
