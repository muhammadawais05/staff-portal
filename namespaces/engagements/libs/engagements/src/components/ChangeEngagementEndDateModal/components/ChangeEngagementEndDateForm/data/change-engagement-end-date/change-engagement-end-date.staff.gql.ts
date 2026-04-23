import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ChangeEngagementEndDate($input: ChangeEngagementEndDateInput!) {
    changeEngagementEndDate(input: $input) {
      engagement {
        id
        endDate
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
