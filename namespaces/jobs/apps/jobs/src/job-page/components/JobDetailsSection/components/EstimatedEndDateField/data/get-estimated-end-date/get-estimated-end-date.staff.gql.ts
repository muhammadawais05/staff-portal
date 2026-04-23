import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetEstimatedEndDate($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        estimatedEndDate
        operations {
          updateJobEstimatedEndDate {
            ...OperationFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
