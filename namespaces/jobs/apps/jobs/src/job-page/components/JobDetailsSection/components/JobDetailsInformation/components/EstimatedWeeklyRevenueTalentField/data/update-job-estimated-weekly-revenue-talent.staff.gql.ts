import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateJobEstimatedWeeklyRevenueTalentDocument } from './update-job-estimated-weekly-revenue-talent.staff.gql.types'

export const UPDATE_JOB_ESTIMATED_WEEKLY_REVENUE_TALENT = gql`
  mutation UpdateJobEstimatedWeeklyRevenueTalent(
    $input: UpdateJobEstimatedWeeklyRevenueTalentInput!
  ) {
    updateJobEstimatedWeeklyRevenueTalent(input: $input) {
      job {
        id
        estimatedWeeklyRevenueTalent
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJobEstimatedWeeklyRevenueTalent = () =>
  useMutation(UpdateJobEstimatedWeeklyRevenueTalentDocument)
