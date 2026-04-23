import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveActivityDocument,
  RemoveActivityMutation
} from './remove-activity.staff.gql.types'

export const REMOVE_ACTIVITY: typeof RemoveActivityDocument = gql`
  mutation RemoveActivity($activityId: ID!) {
    removeActivity(input: { activityId: $activityId }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveActivity = ({
  activityId,
  onCompleted,
  onError
}: {
  activityId: string
  onCompleted?: (data: RemoveActivityMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(REMOVE_ACTIVITY, {
    variables: { activityId },
    onCompleted,
    onError
  })
