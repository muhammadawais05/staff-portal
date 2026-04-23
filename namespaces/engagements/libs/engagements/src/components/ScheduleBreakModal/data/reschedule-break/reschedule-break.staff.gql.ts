import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RescheduleEngagementBreakDocument } from './reschedule-break.staff.gql.types'

export const RESCHEDULE_ENGAGEMENT_BREAK: typeof RescheduleEngagementBreakDocument = gql`
  mutation RescheduleEngagementBreak($input: RescheduleEngagementBreakInput!) {
    rescheduleEngagementBreak(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRescheduleEngagementBreak = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(RescheduleEngagementBreakDocument, {
    onError
  })
