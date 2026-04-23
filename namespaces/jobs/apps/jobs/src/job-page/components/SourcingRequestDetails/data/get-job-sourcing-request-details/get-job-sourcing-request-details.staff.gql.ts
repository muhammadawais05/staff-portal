import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetJobSourcingRequestDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        sourcingRequest {
          id
          status
          talentSpecialist {
            id
            fullName
            webResource {
              url
            }
          }
          operations {
            updateSourcingRequestTalentSpecialist {
              ...OperationFragment
            }
            updateSourcingRequestStatus {
              ...OperationFragment
            }
          }
          salesClaimer {
            id
            fullName
            ... on WebResource {
              webResource {
                url
              }
            }
          }
          clientPartner {
            id
            fullName
            ... on WebResource {
              webResource {
                url
              }
            }
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
