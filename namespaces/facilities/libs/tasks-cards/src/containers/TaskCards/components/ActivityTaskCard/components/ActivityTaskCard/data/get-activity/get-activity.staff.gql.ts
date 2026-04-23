import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { ACTIVITY_FRAGMENT } from '@staff-portal/activities'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { GetActivityDocument } from './get-activity.staff.gql.types'

export const GET_ACTIVITY: typeof GetActivityDocument = gql`
  query GetActivity($activityId: ID!) {
    node(id: $activityId) {
      ... on Activity {
        ...ActivityFragment
      }
    }
  }

  ${ACTIVITY_FRAGMENT}
`

export const useGetActivity = (activityId: string) => {
  const { data, ...restOptions } = useQuery(GET_ACTIVITY, {
    throwOnError: true,
    variables: { activityId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
