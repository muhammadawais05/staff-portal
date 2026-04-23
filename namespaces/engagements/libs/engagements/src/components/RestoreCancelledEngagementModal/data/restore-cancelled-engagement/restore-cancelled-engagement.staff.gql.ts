import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreCancelledEngagementDocument,
  RestoreCancelledEngagementMutation
} from './restore-cancelled-engagement.staff.gql.types'

export const RESTORE_CANCELLED_ENGAGEMENT = gql`
  mutation RestoreCancelledEngagement(
    $input: RestoreCancelledEngagementInput!
  ) {
    restoreCancelledEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreCancelledEngagement = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RestoreCancelledEngagementMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RestoreCancelledEngagementDocument, {
    onCompleted,
    onError
  })
