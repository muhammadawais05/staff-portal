import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateJobPresalesEngagementMutation,
  UpdateJobPresalesEngagementMutationVariables,
  UpdateJobPresalesEngagementDocument
} from './update-job-presales-engagement.staff.gql.types'

export const UPDATE_JOB_PRESALES_ENGAGEMENT = gql`
  mutation UpdateJobPresalesEngagement(
    $input: UpdateJobPresalesEngagementInput!
  ) {
    updateJobPresalesEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateJobPresalesEngagement = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateJobPresalesEngagementMutation) => void
  onError?: () => void
}) =>
  useMutation<
    UpdateJobPresalesEngagementMutation,
    UpdateJobPresalesEngagementMutationVariables
  >(UpdateJobPresalesEngagementDocument, {
    onCompleted,
    onError
  })
