import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreExpiredEngagementDocument,
  RestoreExpiredEngagementMutation
} from './restore-expired-engagement.staff.gql.types'

export const RESTORE_EXPIRED_ENGAGEMENT = gql`
  mutation RestoreExpiredEngagement($input: RestoreExpiredEngagementInput!) {
    restoreExpiredEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreExpiredEngagement = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RestoreExpiredEngagementMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RestoreExpiredEngagementDocument, {
    onCompleted,
    onError
  })
