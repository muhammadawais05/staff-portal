import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ACTIVITY_FRAGMENT } from '../../../../data'
import {
  UpdateActivityDocument,
  UpdateActivityMutation
} from './update-activity.staff.gql.types'

export const UPDATE_ACTIVITY: typeof UpdateActivityDocument = gql`
  mutation UpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      ...MutationResultFragment
      activity {
        ...ActivityFragment
      }
    }
  }

  ${ACTIVITY_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateActivity = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateActivityMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(UPDATE_ACTIVITY, {
    onCompleted,
    onError
  })
