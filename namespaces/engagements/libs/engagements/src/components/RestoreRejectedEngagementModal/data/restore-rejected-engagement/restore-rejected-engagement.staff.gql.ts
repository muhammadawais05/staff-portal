import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreRejectedEngagementDocument,
  RestoreRejectedEngagementMutation
} from './restore-rejected-engagement.staff.gql.types'

export const RESTORE_CLIENT = gql`
  mutation RestoreRejectedEngagement($input: RestoreRejectedEngagementInput!) {
    restoreRejectedEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreRejectedEngagement = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RestoreRejectedEngagementMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RestoreRejectedEngagementDocument, {
    onCompleted,
    onError
  })
