import { GetRelatedTasksQueryVariables } from './get-related-tasks.staff.gql.types'
import { GET_RELATED_TASKS } from './get-related-tasks.staff.gql'

export const createGetRelatedTasksMock = (
  variables: GetRelatedTasksQueryVariables,
  userId = '123'
) => ({
  request: {
    query: GET_RELATED_TASKS,
    variables
  },
  result: {
    data: {
      staffNode: {
        id: userId,
        relatedTasks: {
          nodes: [],
          completedCount: 0,
          __typename: 'RelatedTasksConnection'
        },
        __typename: 'Staff'
      }
    }
  }
})
