import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { COMMUNITY_EVENT_FRAGMENT } from '../../../../data'
import { GetCommunityEventDocument } from './get-community-event.staff.gql.types'

export const GET_COMMUNITY_EVENT: typeof GetCommunityEventDocument = gql`
  query GetCommunityEvent($communityEventId: ID!) {
    node(id: $communityEventId) {
      ... on CommunityEvent {
        ...CommunityEventFragment
      }
    }
  }

  ${COMMUNITY_EVENT_FRAGMENT}
`

export const useGetCommunityEvent = (communityEventId: string) => {
  const { data, ...restOptions } = useQuery(GET_COMMUNITY_EVENT, {
    throwOnError: true,
    variables: { communityEventId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
