import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { JOB_SOURCING_REQUEST_FRAGMENT } from '@staff-portal/jobs'

export default gql`
  mutation UpdateSourcingRequestTalentSpecialist(
    $sourcingRequestId: ID!
    $talentSpecialistId: ID!
    $comment: String
  ) {
    updateSourcingRequestTalentSpecialist(
      input: {
        sourcingRequestId: $sourcingRequestId
        talentSpecialistId: $talentSpecialistId
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
