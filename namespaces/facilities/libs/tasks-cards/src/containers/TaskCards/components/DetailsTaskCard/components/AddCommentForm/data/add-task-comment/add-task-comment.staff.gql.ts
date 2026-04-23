import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddTaskCommentDocument,
  AddTaskCommentMutation
} from './add-task-comment.staff.gql.types'

export const ADD_TASK_COMMENT: typeof AddTaskCommentDocument = gql`
  mutation AddTaskComment($taskId: ID!, $comment: String!) {
    addTaskComment(input: { taskId: $taskId, comment: $comment }) {
      ...MutationResultFragment
      __typename
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTaskComment = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AddTaskCommentMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(ADD_TASK_COMMENT, {
    onCompleted,
    onError,
    ignoreResults: true,
    optimisticResponse: {
      addTaskComment: {
        success: true,
        errors: [],
        __typename: 'AddTaskCommentPayload'
      }
    }
  })
