import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateJobEstimatedEndDate($input: UpdateJobEstimatedEndDateInput!) {
    updateJobEstimatedEndDate(input: $input) {
      ...MutationResultFragment
      job {
        id
        estimatedEndDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
