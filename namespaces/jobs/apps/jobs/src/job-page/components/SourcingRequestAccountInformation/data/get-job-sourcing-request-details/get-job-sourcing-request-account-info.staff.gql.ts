import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSourcingRequestAccountInfo($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        client {
          id
          enterprise
          businessType: businessTypeV2
        }
        sourcingRequest {
          id
          enterpriseJobStatus
          canShareCompanyName
        }
      }
    }
  }
`
