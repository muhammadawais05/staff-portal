import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RemoveTaskTagDocument,
  RemoveTaskTagMutation
} from './remove-task-tag.staff.gql.types'

export const REMOVE_TASK_TAG: typeof RemoveTaskTagDocument = gql`
  mutation RemoveTaskTag($taskId: ID!, $tagId: ID!) {
    removeTaskTag(input: { taskId: $taskId, tagId: $tagId }) {
      ...MutationResultFragment
      __typename
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveTaskTag = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: RemoveTaskTagMutation) => void
  onError?: (error: Error) => void
} = {}) =>
  useMutation(REMOVE_TASK_TAG, {
    onCompleted,
    onError,
    ignoreResults: true,
    optimisticResponse: {
      removeTaskTag: {
        success: true,
        errors: [],
        __typename: 'RemoveTaskTagPayload'
      }
    }
  })
