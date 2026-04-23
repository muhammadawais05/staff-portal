import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetJobSourcingRequestBudgetDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        sourcingRequest {
          id
          canShareRate
          canShareRateComment
          noTalentHourlyRateLimit
          maximumTalentHourlyRate
          canShareRate
          canShareRateComment
          canIncreaseRate
          canIncreaseRateComment
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
