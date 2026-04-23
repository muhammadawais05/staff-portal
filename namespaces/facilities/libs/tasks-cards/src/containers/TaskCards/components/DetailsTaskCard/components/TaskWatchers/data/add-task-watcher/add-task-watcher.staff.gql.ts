import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddTaskWatcherDocument,
  AddTaskWatcherMutation
} from './add-task-watcher.staff.gql.types'

export const ADD_TASK_WATCHER: typeof AddTaskWatcherDocument = gql`
  mutation AddTaskWatcher($taskId: ID!, $watcherId: ID!) {
    addTaskWatcher(input: { taskId: $taskId, watcherId: $watcherId }) {
      ...MutationResultFragment
      __typename
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTaskWatcher = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AddTaskWatcherMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(ADD_TASK_WATCHER, {
    onCompleted,
    onError,
    ignoreResults: true,
    optimisticResponse: {
      addTaskWatcher: {
        success: true,
        errors: [],
        __typename: 'AddTaskWatcherPayload'
      }
    }
  })
