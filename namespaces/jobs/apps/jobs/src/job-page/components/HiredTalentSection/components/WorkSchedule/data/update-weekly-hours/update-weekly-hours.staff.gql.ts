import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_WEEKLY_HOURS = gql`
  mutation UpdateEngagementWeeklyHours(
    $input: UpdateEngagementWeeklyHoursInput!
  ) {
    updateEngagementWeeklyHours(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
