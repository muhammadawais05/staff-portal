import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateTaskDocument,
  CreateTaskMutation
} from './create-task.staff.gql.types'

export const CREATE_TASK: typeof CreateTaskDocument = gql`
  mutation CreateTask($newTask: CreateTaskInput!) {
    createTask(input: $newTask) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTask = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateTaskMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(CREATE_TASK, {
    onCompleted,
    onError,
    ignoreResults: true
  })
