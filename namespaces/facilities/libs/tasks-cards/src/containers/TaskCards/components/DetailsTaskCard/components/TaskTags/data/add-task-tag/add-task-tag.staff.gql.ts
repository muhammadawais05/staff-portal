import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddTaskTagDocument,
  AddTaskTagMutation
} from './add-task-tag.staff.gql.types'

export const ADD_TASK_TAG: typeof AddTaskTagDocument = gql`
  mutation AddTaskTag($taskId: ID!, $tagId: ID!) {
    addTaskTag(input: { taskId: $taskId, tagId: $tagId }) {
      ...MutationResultFragment
      __typename
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTaskTag = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AddTaskTagMutation) => void
  onError?: (error: Error) => void
} = {}) => {
  return useMutation(ADD_TASK_TAG, {
    onCompleted,
    onError,
    ignoreResults: true,
    optimisticResponse: {
      addTaskTag: {
        success: true,
        errors: [],
        __typename: 'AddTaskTagPayload'
      }
    }
  })
}
