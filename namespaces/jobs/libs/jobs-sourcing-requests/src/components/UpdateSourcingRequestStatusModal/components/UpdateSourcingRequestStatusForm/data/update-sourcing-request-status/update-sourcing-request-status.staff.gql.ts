import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { JOB_SOURCING_REQUEST_FRAGMENT } from '@staff-portal/jobs'

export default gql`
  mutation UpdateSourcingRequestStatus(
    $sourcingRequestId: ID!
    $status: SourcingRequestStatus!
    $comment: String!
  ) {
    updateSourcingRequestStatus(
      input: {
        sourcingRequestId: $sourcingRequestId
        status: $status
        comment: $comment
      }
    ) {
      sourcingRequest {
        ...JobSourcingRequestFragment
      }
      ...MutationResultFragment
    }
  }

  ${JOB_SOURCING_REQUEST_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
