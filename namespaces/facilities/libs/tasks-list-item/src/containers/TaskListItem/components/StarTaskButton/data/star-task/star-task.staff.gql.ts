import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { StarTaskDocument, StarTaskMutation } from './star-task.staff.gql.types'

export const STAR_TASK: typeof StarTaskDocument = gql`
  mutation StarTask($taskId: ID!, $starred: Boolean!) {
    starTask(input: { taskId: $taskId, starred: $starred }) {
      ...MutationResultFragment
      task {
        id
        starred
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useStarTask = ({
  taskId,
  onCompleted,
  onError
}: {
  taskId: string
  onCompleted?: (data: StarTaskMutation) => void
  onError?: (error: Error) => void
}) => {
  const [starTask, mutationResult] = useMutation(STAR_TASK, {
    onCompleted,
    onError
  })

  return {
    ...mutationResult,
    starTask: (starred: boolean) =>
      starTask({
        variables: {
          taskId,
          starred
        }
      })
  }
}
