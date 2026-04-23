import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ScheduleEngagementBreakDocument } from './schedule-break.staff.gql.types'

export const SCHEDULE_ENGAGEMENT_BREAK: typeof ScheduleEngagementBreakDocument = gql`
  mutation ScheduleEngagementBreak($input: ScheduleEngagementBreakInput!) {
    scheduleEngagementBreak(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useScheduleEngagementBreak = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(ScheduleEngagementBreakDocument, {
    onError
  })
