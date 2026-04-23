import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveTaskWatcherDocument,
  RemoveTaskWatcherMutation
} from './remove-task-watcher.staff.gql.types'

export const REMOVE_TASK_WATCHER: typeof RemoveTaskWatcherDocument = gql`
  mutation RemoveTaskWatcher($taskId: ID!, $watcherId: ID!) {
    removeTaskWatcher(input: { taskId: $taskId, watcherId: $watcherId }) {
      ...MutationResultFragment
      __typename
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveTaskWatcher = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RemoveTaskWatcherMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(REMOVE_TASK_WATCHER, {
    onCompleted,
    onError,
    ignoreResults: true,
    optimisticResponse: {
      removeTaskWatcher: {
        success: true,
        errors: [],
        __typename: 'RemoveTaskWatcherPayload'
      }
    }
  })
