import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ProposeEngagementEstimateEndDate(
    $input: ProposeEngagementEndInput!
  ) {
    proposeEngagementEnd(input: $input) {
      ...MutationResultFragment
      engagement {
        id
        proposedEnd {
          ...ProposedEngagementEndMutationFragment
        }
      }
    }
  }

  fragment ProposedEngagementEndMutationFragment on ProposedEngagementEnd {
    id
    endDate
    status
  }
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
